import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export function HomePage() {
    return (
        <div className="space-y-6">
            <section>
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Overview</h2>
                <div className="grid gap-4">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
                        <CardHeader>
                            <CardTitle className="text-white/90">Total Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">$12,450.00</div>
                            <div className="mt-2 text-sm text-blue-100">+2.5% from last month</div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h2>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    Tx
                                </div>
                                <div>
                                    <div className="font-medium">Payment Received</div>
                                    <div className="text-xs text-gray-500">Today, 10:23 AM</div>
                                </div>
                            </div>
                            <div className="font-semibold text-green-600">+$150.00</div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
