# Frontend Integration Guide

## Overview

The ContractMind frontend is now integrated with both the backend API and smart contracts. The system supports **two modes**:

1. **Mock Mode** (`NEXT_PUBLIC_USE_MOCK=1`): Uses client-side localStorage-backed mocks for development/demo
2. **Production Mode** (`NEXT_PUBLIC_USE_MOCK=0`): Uses real backend APIs and blockchain contracts

## Environment Configuration

### Required Environment Variables

```bash
# Somnia Network
NEXT_PUBLIC_SOMNIA_RPC_URL=https://dream-rpc.somnia.network
NEXT_PUBLIC_SOMNIA_CHAIN_ID=50312

# Smart Contracts (Deployed addresses)
NEXT_PUBLIC_HUB_CONTRACT_ADDRESS=0x8244777FAe8F2f4AE50875405AFb34E10164C027
NEXT_PUBLIC_REGISTRY_CONTRACT_ADDRESS=0x318FFd8Fc398a3639Faa837307Ffdd0b9E1017c9

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Mock/Real Toggle
NEXT_PUBLIC_USE_MOCK=0              # 0 = real data, 1 = mock data
NEXT_PUBLIC_USE_REAL_CHAT=0         # 0 = mock chat, 1 = real LLM chat
```

### Mode Configuration

| `USE_MOCK` | `USE_REAL_CHAT` | Behavior |
|------------|-----------------|----------|
| `0` | `0` | Full production mode - real blockchain + real backend + real chat |
| `0` | `1` | Production with real chat (if backend available) |
| `1` | `0` | Full mock mode - localStorage data + fake responses |
| `1` | `1` | Mock data with real chat API calls |

## Architecture

### File Structure

```
frontend/
├── lib/
│   ├── config.ts              # Centralized configuration (MOCK_CONFIG, CONTRACTS, etc.)
│   ├── api.ts                 # API client with mock/real toggle
│   └── contracts/
│       ├── index.ts           # Contract addresses and ABIs export
│       ├── AgentRegistry.json # AgentRegistry ABI
│       └── ContractMindHubV2.json # ContractMindHub ABI
├── hooks/
│   ├── useContracts.ts        # Low-level contract interaction hooks
│   └── useAgents.ts           # High-level agent management hooks
└── app/
    └── dashboard/
        ├── agents/            # Agent management UI
        ├── chat/              # Chat interface
        └── analytics/         # Analytics dashboard
```

### Integration Layers

```
┌─────────────────────────────────────────┐
│         React Components (UI)           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│     hooks/useAgents.ts                  │
│     (High-level business logic)         │
└─────┬───────────────────────────────┬───┘
      │                               │
┌─────▼────────────┐      ┌──────────▼─────┐
│  hooks/          │      │  lib/api.ts    │
│  useContracts.ts │      │  (Backend API) │
│  (wagmi hooks)   │      └────────────────┘
└─────┬────────────┘
      │
┌─────▼─────────────────────┐
│  Smart Contracts          │
│  (AgentRegistry + Hub)    │
└───────────────────────────┘
```

## Contract Integration

### Smart Contract Hooks

Located in `hooks/useContracts.ts`:

#### AgentRegistry Hooks

- `useAgentsByOwner(address)` - Get all agents owned by an address
- `useAgent(agentId)` - Get agent details
- `useAgentCount()` - Get total agent count
- `useRegisterAgent()` - Register new agent (write)
- `useUpdateAgent()` - Update agent config (write)
- `useDeactivateAgent()` - Deactivate agent (write)
- `useReactivateAgent()` - Reactivate agent (write)

#### ContractMindHub Hooks

- `useIsFunctionAuthorized(agentId, contract, selector)` - Check function authorization
- `useAgentCallCount(agentId)` - Get agent call statistics
- `useAgentGasUsed(agentId)` - Get agent gas usage
- `useAuthorizeFunctions()` - Authorize functions (write)
- `useRevokeFunctions()` - Revoke functions (write)
- `useExecuteQuery()` - Execute read-only call
- `useValidateAndExecute()` - Execute state-changing transaction

### Usage Example

```typescript
import { useRegisterAgent } from '@/hooks/useContracts';
import { useAccount } from 'wagmi';

function RegisterAgentButton() {
  const { address } = useAccount();
  const { registerAgent, isPending, isSuccess } = useRegisterAgent();

  const handleRegister = async () => {
    await registerAgent(
      '0x...' as `0x${string}`, // target contract
      'My Agent',                // name
      'ipfs://...'              // config IPFS hash
    );
  };

  return (
    <button onClick={handleRegister} disabled={isPending}>
      {isPending ? 'Registering...' : 'Register Agent'}
    </button>
  );
}
```

## Backend API Integration

### API Client

Located in `lib/api.ts`:

- Automatically switches between `MockApiClient` and `ApiClient` based on `NEXT_PUBLIC_USE_MOCK`
- All endpoints prefixed with `/api/v1/`
- Includes WebSocket support for real-time chat

### Available Methods

#### Agent Management
- `apiClient.getAgents()` - Fetch all agents
- `apiClient.getAgent(id)` - Fetch single agent
- `apiClient.createAgent(data)` - Create new agent
- `apiClient.updateAgent(id, data)` - Update agent
- `apiClient.deleteAgent(id)` - Delete agent

#### Chat
- `apiClient.sendMessage(agentId, message, userAddress)` - Send chat message
- `apiClient.getChatHistory(agentId, userAddress)` - Get chat history
- `apiClient.connectWebSocket(agentId, userAddress)` - Connect to real-time chat

#### Transactions
- `apiClient.executeTransaction(agentId, txData, userAddress)` - Execute transaction

#### Analytics
- `apiClient.getAgentAnalytics(agentId, timeRange)` - Get agent analytics
- `apiClient.getOverallAnalytics(timeRange)` - Get overall analytics

### Usage Example

```typescript
import { apiClient } from '@/lib/api';

async function fetchAgents() {
  try {
    const agents = await apiClient.getAgents();
    console.log('Agents:', agents);
  } catch (error) {
    console.error('Failed to fetch agents:', error);
  }
}
```

## High-Level Hooks

### useAgents Hook

Located in `hooks/useAgents.ts`:

Combines blockchain data with backend API data automatically.

```typescript
import { useAgents } from '@/hooks/useAgents';

function AgentsList() {
  const { agents, loading, error, refetch } = useAgents();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {agents.map(agent => (
        <div key={agent.id}>{agent.name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Other High-Level Hooks

- `useAgent(agentId)` - Fetch single agent
- `useCreateAgent()` - Create agent with backend sync
- `useUpdateAgent()` - Update agent
- `useDeleteAgent()` - Delete agent

## Development Workflow

### 1. Mock Mode Development

Perfect for UI development without backend/blockchain:

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=1
NEXT_PUBLIC_USE_REAL_CHAT=0
```

Features:
- ✅ localStorage-backed fake data
- ✅ Instant responses
- ✅ No wallet required
- ✅ Create/edit/delete agents
- ✅ Mock chat responses

### 2. Backend Integration Testing

Test with real backend but mock blockchain:

```bash
# Start backend first
cd backend
poetry run uvicorn app.main:app --reload

# .env.local
NEXT_PUBLIC_USE_MOCK=0
NEXT_PUBLIC_USE_REAL_CHAT=1
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Features:
- ✅ Real backend API calls
- ✅ Real LLM chat responses
- ✅ WebSocket support
- ⚠️ Requires backend running

### 3. Full Production Mode

Complete integration with backend + blockchain:

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=0
NEXT_PUBLIC_USE_REAL_CHAT=0
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SOMNIA_RPC_URL=https://dream-rpc.somnia.network
```

Features:
- ✅ Real blockchain transactions
- ✅ Real backend API
- ✅ Real LLM chat
- ✅ Smart contract interactions
- ⚠️ Requires wallet connection
- ⚠️ Requires backend + blockchain

## Testing

### Test Mock Mode

```bash
# Set mock mode
echo "NEXT_PUBLIC_USE_MOCK=1" >> .env.local

# Run development server
npm run dev

# Visit http://localhost:3000/dashboard/agents
# Should see mock agents and be able to create/edit without blockchain
```

### Test Production Mode

```bash
# Set production mode
echo "NEXT_PUBLIC_USE_MOCK=0" >> .env.local

# Start backend
cd ../backend && poetry run uvicorn app.main:app --reload

# Run frontend
npm run dev

# Connect wallet and test full flow
```

## Next Steps

### To Complete Integration:

1. **Chat Interface Integration**
   - Update `dashboard/chat/page.tsx` to use `apiClient.sendMessage()`
   - Implement WebSocket connection for real-time messages
   - Add `USE_REAL_CHAT` toggle support

2. **Transaction Execution Flow**
   - Create transaction signing component
   - Integrate `useValidateAndExecute()` hook
   - Add transaction confirmation UI
   - Display gas estimates

3. **Analytics Integration**
   - Connect analytics page to `apiClient.getAgentAnalytics()`
   - Display real blockchain metrics
   - Add charts and visualizations

4. **Error Handling**
   - Add comprehensive error boundaries
   - Display user-friendly error messages
   - Handle network failures gracefully

5. **Testing**
   - Write unit tests for hooks
   - Add integration tests
   - Test both mock and production modes

## Troubleshooting

### Common Issues

**Issue**: "Contract not found" error
- **Solution**: Ensure contract addresses in `.env.local` match deployed contracts
- Check `deployments/latest.json` for correct addresses

**Issue**: API calls fail with CORS error
- **Solution**: Ensure backend CORS settings include frontend URL
- Check `backend/app/config.py` CORS configuration

**Issue**: Wallet connection fails
- **Solution**: Verify `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set
- Ensure you're on Somnia Testnet (chain ID 50312)

**Issue**: Mock mode not working
- **Solution**: Clear localStorage: `localStorage.removeItem('contractmind_frontend_mock_v1')`
- Check browser console for errors

## Resources

- [Backend API Documentation](../backend/README.md)
- [Smart Contracts Documentation](../contracts/README.md)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
