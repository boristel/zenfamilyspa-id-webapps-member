import React from 'react';
import { Card } from '../components/ui/Card';

export function HistoryPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                                Store
                            </div>
                            <div>
                                <div className="font-medium">Grocery Store</div>
                                <div className="text-xs text-gray-500">Yesterday</div>
                            </div>
                        </div>
                        <div className="font-semibold text-gray-900">-$45.20</div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
