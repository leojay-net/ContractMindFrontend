# Agent Registration Flow Fix

## Problem
Frontend was trying to POST directly to `/api/v1/agents/` which returned **405 Method Not Allowed** because that endpoint only supports GET (list agents).

The correct flow requires:
1. **Prepare transaction** → `/api/v1/agents/register` (POST)
2. **User signs in wallet** → Send to blockchain
3. **Confirm registration** → `/api/v1/agents/confirm` (POST)

---

## Changes Made

### 1. Frontend API Client (`frontend/lib/api.ts`)

#### Added New Methods:
```typescript
async prepareAgentRegistration(data: {
    ownerAddress: string;
    targetContract: string;
    name: string;
    configIPFS: string;
}): Promise<{
    success: boolean;
    requiresTransaction: boolean;
    transaction: { ... };
}>

async confirmAgentRegistration(txHash: string): Promise<{
    success: boolean;
    agentId?: string;
    txHash: string;
    agent?: any;
    error?: string;
}>
```

#### Updated:
- `createAgent()` now throws error directing to use new flow
- Mock client implements both methods with simulated delays

---

### 2. Create Agent Page (`frontend/app/dashboard/agents/create/page.tsx`)

#### Added Imports:
```typescript
import { useEffect } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { Loader2 } from 'lucide-react';
```

#### New State:
```typescript
const { sendTransaction, data: txHash, isPending: isSending } = useSendTransaction();
const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
});
const [pendingTxData, setPendingTxData] = useState<any>(null);
```

#### New Flow in `handleSubmit()`:
```typescript
// Step 1: Prepare transaction from backend
const prepareResult = await apiClient.prepareAgentRegistration({
    ownerAddress: address,
    targetContract: formData.targetContract,
    name: formData.name,
    configIPFS,
});

// Step 2: Send transaction via wallet
sendTransaction({
    to: tx.to,
    data: tx.data,
    value: BigInt(tx.value || '0'),
    gas: BigInt(tx.gasEstimate),
});

// Step 3: Watch for confirmation with useEffect
useEffect(() => {
    if (isConfirmed && txHash) {
        confirmRegistration(txHash);
    }
}, [isConfirmed, txHash]);

// Step 4: Confirm with backend
const confirmResult = await apiClient.confirmAgentRegistration(hash);
```

#### Enhanced Button States:
- **Preparing...** - Calling backend prepare endpoint
- **Waiting for signature...** - User signing in wallet
- **Confirming transaction...** - Waiting for blockchain confirmation
- **Deploy Agent** - Ready to submit

---

## Backend Endpoints (Already Correct)

### POST `/api/v1/agents/register`
**Request:**
```json
{
  "ownerAddress": "0x...",
  "targetContract": "0x...",
  "name": "My Agent",
  "configIPFS": "ipfs://..."
}
```

**Response:**
```json
{
  "success": true,
  "requiresTransaction": true,
  "transaction": {
    "to": "0x318FFd8Fc398a3639Faa837307Ffdd0b9E1017c9",
    "data": "0x...",
    "value": "0",
    "gasEstimate": "500000",
    "explanation": "Register agent 'My Agent'",
    "functionName": "registerAgent",
    "warnings": ["Gas fees will apply", ...]
  }
}
```

### POST `/api/v1/agents/confirm`
**Request:**
```json
{
  "txHash": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "agentId": "0x...",
  "txHash": "0x...",
  "agent": {
    "id": "0x...",
    "owner": "0x...",
    "targetContract": "0x...",
    "name": "My Agent",
    "active": true
  }
}
```

---

## User Experience Flow

1. **User fills form** with agent details
2. **Clicks "Deploy Agent"**
   - Frontend calls `/api/v1/agents/register`
   - Backend prepares unsigned transaction
   
3. **Wallet popup appears**
   - User reviews transaction details
   - User signs transaction
   
4. **Transaction sent to blockchain**
   - Frontend waits for confirmation
   - Shows "Confirming transaction..." status
   
5. **After blockchain confirmation**
   - Frontend calls `/api/v1/agents/confirm` with tx hash
   - Backend parses AgentRegistered event
   - Returns agent ID and details
   
6. **Success!**
   - User redirected to agents list
   - New agent appears in dashboard

---

## Testing

### With Mock Mode (NEXT_PUBLIC_USE_MOCK=1):
```bash
cd frontend
npm run dev
```
- Navigate to Create Agent page
- Fill in form
- Click Deploy Agent
- Mock flow simulates wallet signing and confirmation

### With Real Backend:
```bash
# Terminal 1 - Backend
cd backend
uvicorn app.main:app --reload

# Terminal 2 - Frontend  
cd frontend
npm run dev
```
1. Connect wallet (Somnia Testnet)
2. Create agent
3. Sign transaction in wallet
4. Wait for confirmation
5. Agent appears in list

---

## Error Handling

The flow includes proper error handling at each step:

- **Prepare fails**: Shows error, user can retry
- **User rejects signature**: Transaction cancelled, user can retry
- **Transaction reverts**: Backend returns error in confirm response
- **Confirmation timeout**: User can check transaction manually

---

## Benefits

✅ **Correct architecture** - Follows prepare → sign → confirm pattern  
✅ **User control** - User approves every transaction  
✅ **Gas estimation** - Backend provides accurate gas estimates  
✅ **Event parsing** - Backend extracts agentId from blockchain events  
✅ **Error recovery** - Graceful handling at each step  
✅ **Progress visibility** - Clear status messages for users  

---

## Summary

The agent registration now follows the proper Web3 flow:
1. ✅ Backend prepares transaction data
2. ✅ Frontend sends to wallet for signing
3. ✅ Transaction submitted to blockchain
4. ✅ Backend confirms and extracts agent details
5. ✅ User sees success and agent in list

**No more 405 errors!** 🎉
