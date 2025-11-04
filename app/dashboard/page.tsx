/**
 * Dashboard Overview Page
 * Main dashboard with stats, recent activity, and quick actions
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Bot,
    MessageSquare,
    BarChart3,
    FileText,
    TrendingUp,
    Users,
    Zap,
    Activity,
    CheckCircle,
    XCircle,
    ArrowUpRight,
    Loader2,
    Plus,
    Clock,
    AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import { useLoading } from '@/hooks/useLoading';
import { useToast } from '@/hooks/useToast';

export default function DashboardPage() {
    const { isLoading, withLoading } = useLoading();
    const toast = useToast();

    const [stats, setStats] = useState([
        { label: 'Total Agents', value: '0', change: 'Loading...', icon: Bot, trend: 'up' as const },
        { label: 'Interactions', value: '0', change: 'Loading...', icon: Activity, trend: 'up' as const },
        { label: 'Success Rate', value: '0%', change: 'Loading...', icon: CheckCircle, trend: 'up' as const },
        { label: 'Gas Saved', value: '0 ETH', change: 'Loading...', icon: Zap, trend: 'up' as const },
    ]);

    const [recentAgents, setRecentAgents] = useState<any[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [analytics, agents, transactions] = await Promise.all([
                    apiClient.getOverallAnalytics().catch(() => ({})),
                    apiClient.getAgents().catch(() => []),
                    apiClient.getTransactionHistory(undefined, 3).catch(() => []),
                ]);

                // Update stats
                setStats([
                    {
                        label: 'Total Agents',
                        value: analytics.totalAgents?.toString() || agents.length.toString() || '0',
                        change: `+${analytics.newAgentsThisWeek || 0} this week`,
                        icon: Bot,
                        trend: 'up' as const
                    },
                    {
                        label: 'Interactions',
                        value: analytics.totalCalls?.toLocaleString() || '0',
                        change: `+${analytics.callsGrowthPercent || 0}% from last month`,
                        icon: Activity,
                        trend: 'up' as const
                    },
                    {
                        label: 'Success Rate',
                        value: `${analytics.successRate || 0}%`,
                        change: `+${analytics.successRateGrowth || 0}% from last month`,
                        icon: CheckCircle,
                        trend: 'up' as const
                    },
                    {
                        label: 'Gas Saved',
                        value: `${analytics.totalGasUsed || '0'} ETH`,
                        change: `+${analytics.gasGrowth || '0'} ETH this week`,
                        icon: Zap,
                        trend: 'up' as const
                    },
                ]);

                // Update recent agents (top 3 most active) - agents is already an array
                const sortedAgents = (Array.isArray(agents) ? agents : [])
                    .filter((a: any) => a.active)
                    .sort((a: any, b: any) => (b.analytics?.totalCalls || 0) - (a.analytics?.totalCalls || 0))
                    .slice(0, 3);

                setRecentAgents(sortedAgents.map((agent: any) => ({
                    id: agent.id,
                    name: agent.name,
                    status: agent.active ? 'active' : 'inactive',
                    interactions: agent.analytics?.totalCalls || 0,
                    lastActive: agent.updatedAt || agent.createdAt || 'Unknown',
                })));

                // Update recent transactions
                setRecentTransactions((Array.isArray(transactions) ? transactions : []).slice(0, 3).map((tx: any) => ({
                    id: tx.hash || tx.id || `tx-${crypto.randomUUID()}`,
                    type: tx.functionName || tx.type || 'Transaction',
                    agent: tx.agentId || tx.agent || 'Unknown',
                    status: tx.success ? 'success' : 'failed',
                    hash: tx.hash || tx.txHash || `0x${Math.random().toString(16).slice(2)}`,
                    time: tx.timestamp || new Date().toISOString(),
                })));
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
                toast.error('Failed to load dashboard data');
            }
        };

        fetchDashboardData();
    }, [toast]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Welcome back! Here's what's happening with your agents.</p>
                </div>

                <Link
                    href="/dashboard/agents/create"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-5 h-5" />
                    Create Agent
                </Link>
            </div>

            {/* Stats Grid */}
            {!isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                            <p className="text-sm text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Agents */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                >
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Recent Agents</h2>
                            <Link
                                href="/dashboard/agents"
                                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                            >
                                View all
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="divide-y divide-white/5">
                        {recentAgents.map((agent) => (
                            <Link
                                key={agent.id}
                                href={`/dashboard/agents/${agent.id}`}
                                className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white group-hover:text-gray-100">{agent.name}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`inline-flex items-center gap-1 text-xs font-medium ${agent.status === 'active' ? 'text-green-400' : 'text-gray-500'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-400' : 'bg-gray-500'
                                                    }`} />
                                                {agent.status}
                                            </span>
                                            <span className="text-xs text-gray-500">·</span>
                                            <span className="text-xs text-gray-500">{agent.interactions} interactions</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-gray-500">{agent.lastActive}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                >
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                            <Link
                                href="/dashboard/analytics"
                                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                            >
                                View all
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="divide-y divide-white/5">
                        {recentTransactions.map((tx) => (
                            <div
                                key={tx.id}
                                className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.status === 'success'
                                        ? 'bg-green-500/20'
                                        : tx.status === 'pending'
                                            ? 'bg-yellow-500/20'
                                            : 'bg-red-500/20'
                                        }`}>
                                        {tx.status === 'success' ? (
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                        ) : tx.status === 'pending' ? (
                                            <Clock className="w-5 h-5 text-yellow-400" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-400" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{tx.agent}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500">{tx.action}</span>
                                            <span className="text-xs text-gray-600">·</span>
                                            <a
                                                href={`https://testnet-explorer.somnia.network/tx/${tx.txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-400 hover:text-blue-300 font-mono"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {tx.txHash}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-gray-500">{tx.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/dashboard/agents/create"
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
                    >
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                            <Plus className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-white group-hover:text-gray-100">Create Agent</p>
                            <p className="text-xs text-gray-500">Deploy new agent</p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/chat"
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
                    >
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-white group-hover:text-gray-100">Start Chat</p>
                            <p className="text-xs text-gray-500">Interact with agents</p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/analytics"
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
                    >
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-white group-hover:text-gray-100">View Analytics</p>
                            <p className="text-xs text-gray-500">Performance metrics</p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/docs"
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
                    >
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-white group-hover:text-gray-100">Documentation</p>
                            <p className="text-xs text-gray-500">Learn more</p>
                        </div>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
