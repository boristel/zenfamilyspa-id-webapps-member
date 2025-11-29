import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/Card';
// import { Button } from './components/ui/Button';
// import { Input } from './components/ui/Input';

export function TestComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Title</CardTitle>
                <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardContent>
                {/* <Input placeholder="Test" /> */}
                Content
            </CardContent>
            <CardFooter>
                {/* <Button>Click me</Button> */}
                Footer
            </CardFooter>
        </Card>
    );
}
