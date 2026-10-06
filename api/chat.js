export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, system } = req.body;

  // 驗證 messages 格式
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  // 限制對話長度，避免濫用
  if (messages.length > 20) {
    return res.status(400).json({ error: 'Too many messages in conversation' });
  }

  // 限制單則訊息長度
  const MAX_MESSAGE_LENGTH = 1000;
  for (const msg of messages) {
    if (typeof msg.content !== 'string' || msg.content.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Message too long or invalid' });
    }
  }

  // model 和 max_tokens 不讓前端決定，後端寫死，避免被竄改濫用額度
  const FIXED_MODEL = 'claude-sonnet-4-20250514';
  const FIXED_MAX_TOKENS = 1000;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: FIXED_MODEL,
        max_tokens: FIXED_MAX_TOKENS,
        system,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      // 不把 Anthropic 的原始錯誤內容直接回傳給前端，避免洩漏內部資訊
      return res.status(response.status).json({ error: 'Failed to get response' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}