# ContractMind - Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### 1. Clone & Setup

```bash
# Clone repository
git clone https://github.com/your-org/contractmind.git
cd contractmind

# Setup frontend
cd frontend
npm install
cp .env.example .env.local

# Setup backend
cd ../backend
poetry install
cp .env.example .env
```

### 2. Choose Your Mode

#### Option A: Mock Mode (No backend/blockchain required)

Perfect for UI development and demos!

```bash
# frontend/.env.local
NEXT_PUBLIC_USE_MOCK=1
NEXT_PUBLIC_USE_REAL_CHAT=0

# Run frontend only
cd frontend
npm run dev
```

✅ Visit http://localhost:3000  
✅ Create agents, chat, execute transactions - all in mock mode!

#### Option B: Full Production Mode

Complete integration with backend + blockchain:

```bash
# Terminal 1: Start Backend
cd backend
poetry run uvicorn app.main:app --reload

# Terminal 2: Start Frontend
cd frontend
# Set .env.local
NEXT_PUBLIC_USE_MOCK=0
NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
```

✅ Visit http://localhost:3000  
✅ Connect wallet (MetaMask + Somnia Testnet)  
✅ Create real agents on blockchain!

## 📚 Key Documentation

- **[INTEGRATION.md](./INTEGRATION.md)** - Complete integration guide
- **[API Documentation](./app/docs)** - API reference
- **[Backend Setup](../backend/README.md)** - Backend configuration
- **[Smart Contracts](../contracts/README.md)** - Contract details

## 🎯 Features

### Mock Mode Features
- ✅ Create/edit/delete agents (localStorage)
- ✅ Mock chat responses
- ✅ Fake transaction execution
- ✅ No wallet required
- ✅ Instant responses

### Production Mode Features
- ✅ Real blockchain agents (AgentRegistry)
- ✅ Real AI chat (Gemini/Claude/OpenAI)
- ✅ Real transaction execution
- ✅ Function authorization on-chain
- ✅ Analytics and metrics
- ✅ WebSocket real-time updates

## 🔧 Environment Variables Reference

| Variable | Mock Mode | Production Mode | Description |
|----------|-----------|-----------------|-------------|
| `NEXT_PUBLIC_USE_MOCK` | `1` | `0` | Toggle mock/real data |
| `NEXT_PUBLIC_USE_REAL_CHAT` | `0` | `0` or `1` | Toggle mock/real chat |
| `NEXT_PUBLIC_API_URL` | N/A | `http://localhost:8000` | Backend API URL |
| `NEXT_PUBLIC_HUB_CONTRACT_ADDRESS` | N/A | `0x8244...027` | ContractMindHub address |
| `NEXT_PUBLIC_REGISTRY_CONTRACT_ADDRESS` | N/A | `0x318F...c9` | AgentRegistry address |

## 🧪 Testing

### Test Mock Mode
```bash
npm run dev
# Visit http://localhost:3000/dashboard/agents
# Create agents without wallet!
```

### Test Production Mode
```bash
# 1. Start backend
cd backend && poetry run uvicorn app.main:app --reload

# 2. Set production env
echo "NEXT_PUBLIC_USE_MOCK=0" > .env.local

# 3. Start frontend
npm run dev

# 4. Connect wallet (MetaMask)
# 5. Create real agent on blockchain
```

## 🐛 Troubleshooting

**Mock mode not working?**
```bash
# Clear localStorage
# Open browser console:
localStorage.removeItem('contractmind_frontend_mock_v1')
```

**Can't connect wallet?**
- Add Somnia Testnet to MetaMask: Chain ID `50312`
- RPC: `https://dream-rpc.somnia.network`
- Get testnet SOMI from faucet

**Backend connection fails?**
- Ensure backend is running on port 8000
- Check CORS settings in `backend/app/config.py`
- Verify `.env.local` has correct `NEXT_PUBLIC_API_URL`

## 📱 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Wagmi
- **Backend**: FastAPI, Python 3.11, PostgreSQL, Redis
- **Blockchain**: Solidity 0.8.20, Foundry, Somnia Testnet
- **AI**: Gemini, Claude, OpenAI

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details

## 🔗 Links

- [Documentation](https://docs.contractmind.io)
- [Discord Community](https://discord.gg/contractmind)
- [Twitter](https://twitter.com/contractmind)
- [GitHub](https://github.com/your-org/contractmind)

---

**Need Help?** Open an issue or join our [Discord](https://discord.gg/contractmind)!
