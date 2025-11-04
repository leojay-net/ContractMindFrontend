/**
 * Documentation Page
 * 
 * Professional documentation hub for ContractMind platform.
 * 
 * @module app/docs/page
 */

import Link from 'next/link';
import { FileText, Code, Book, Rocket, Shield, Zap } from 'lucide-react';

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/80 backdrop-blur-lg sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
                            ← Back to Home
                        </Link>
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Launch App
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <div className="container mx-auto px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Documentation
                        </h1>
                        <p className="text-xl text-gray-400 mb-8">
                            Complete technical documentation for the ContractMind infrastructure platform.
                            Build, deploy, and manage AI-powered blockchain agents with enterprise-grade reliability.
                        </p>
                    </div>
                </div>
            </section>

            {/* Documentation Sections */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Getting Started */}
                            <Link href="/docs/quick-start">
                                <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 h-full flex flex-col">
                                    <div className="text-white mb-4">
                                        <Rocket className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Getting Started</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        Quick start guide to deploy your first AI agent in minutes
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Installation
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Environment Setup
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            First Agent Deployment
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Wallet Configuration
                                        </li>
                                    </ul>
                                </div>
                            </Link>

                            {/* Installation Guide */}
                            <Link href="/docs/installation">
                                <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 h-full flex flex-col">
                                    <div className="text-white mb-4">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Installation Guide</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        Complete installation instructions for all platforms and environments
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            System Requirements
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Step-by-Step Setup
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Database Configuration
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Troubleshooting
                                        </li>
                                    </ul>
                                </div>
                            </Link>

                            {/* Deployment Guide */}
                            {/* Deployment Guide */}
                            <Link href="/docs/deployment">
                                <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 h-full flex flex-col">
                                    <div className="text-white mb-4">
                                        <Shield className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Deployment Guide</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        Production deployment strategies for Docker, AWS, Vercel, and more
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Docker Deployment
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Cloud Platforms
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            CI/CD Setup
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Security Best Practices
                                        </li>
                                    </ul>
                                </div>
                            </Link>              {/* Architecture */}
                            <Link href="/docs/architecture">
                                <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 h-full flex flex-col">
                                    <div className="text-white mb-4">
                                        <Code className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Architecture</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        System design, component structure, and technical decisions
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            System Overview
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Component Architecture
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Data Flow
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Security Architecture
                                        </li>
                                    </ul>
                                </div>
                            </Link>

                            {/* API Reference */}
                            <Link href="/docs/api">
                                <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 h-full flex flex-col">
                                    <div className="text-white mb-4">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">API Reference</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        Complete API documentation with endpoints and examples
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Authentication
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Agents API
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Chat API
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Analytics API
                                        </li>
                                    </ul>
                                </div>
                            </Link>

                            {/* Smart Contracts */}
                            <Link href="/docs/contracts">
                                <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 h-full flex flex-col">
                                    <div className="text-white mb-4">
                                        <Shield className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Smart Contracts</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        Solidity contracts, deployment guides, and security practices
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Contract Overview
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Hub-Aware Architecture
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Deployment Guide
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Security Patterns
                                        </li>
                                    </ul>
                                </div>
                            </Link>

                            {/* Frontend Guide */}
                            <Link href="/docs/frontend">
                                <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 h-full flex flex-col">
                                    <div className="text-white mb-4">
                                        <Zap className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Frontend Integration</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        Next.js application structure and Web3 integration patterns
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Project Structure
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Web3 Provider Setup
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Component Library
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Authentication
                                        </li>
                                    </ul>
                                </div>
                            </Link>

                            {/* Backend Guide */}
                            <Link href="/docs/backend">
                                <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 h-full flex flex-col">
                                    <div className="text-white mb-4">
                                        <Book className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Backend Services</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        FastAPI backend, AI integration, and database management
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Service Architecture
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            AI Model Integration
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            Database Schema
                                        </li>
                                        <li className="text-sm text-gray-500 flex items-start">
                                            <span className="mr-2">•</span>
                                            WebSocket Services
                                        </li>
                                    </ul>
                                </div>
                            </Link>

                        </div>

                        {/* Quick Links */}
                        <div className="mt-20 grid md:grid-cols-2 gap-6">
                            <div className="p-8 rounded-lg border border-white/10 bg-white/5">
                                <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="https://github.com/your-org/ContractMindInfra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            → GitHub Repository
                                        </a>
                                    </li>
                                    <li>
                                        <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                                            → Launch Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            → API Documentation (Swagger)
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://discord.gg/contractmind" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            → Community Discord
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://faucet.somnia.network" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            → Somnia Testnet Faucet
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-8 rounded-lg border border-white/10 bg-white/5">
                                <h3 className="text-2xl font-bold mb-4">Resources</h3>
                                <ul className="space-y-3">
                                    <li className="text-gray-400">
                                        <span className="font-semibold text-white">Frontend:</span> Next.js 14, TypeScript, Wagmi, Reown AppKit
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="font-semibold text-white">Backend:</span> Python 3.11+, FastAPI, PostgreSQL
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="font-semibold text-white">Contracts:</span> Solidity ^0.8.0, Foundry
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="font-semibold text-white">Network:</span> Somnia Testnet (Chain ID: 50312)
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="font-semibold text-white">AI Models:</span> OpenAI, Anthropic Claude, Google Gemini
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Prerequisites */}
                        <div className="mt-12 p-8 rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/0">
                            <h3 className="text-2xl font-bold mb-4">Prerequisites</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-2 text-white">Development</h4>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>Node.js ≥ 18.0.0</li>
                                        <li>Python ≥ 3.11</li>
                                        <li>PostgreSQL ≥ 14</li>
                                        <li>Git</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-white">Blockchain</h4>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>Web3 Wallet (MetaMask)</li>
                                        <li>Somnia Testnet Access</li>
                                        <li>Test SOMI Tokens</li>
                                        <li>WalletConnect Project ID</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-white">API Keys</h4>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>OpenAI API Key</li>
                                        <li>Anthropic API Key</li>
                                        <li>Google Gemini API Key</li>
                                        <li>Database Credentials</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
