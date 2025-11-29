// Simple test to verify Firebase configuration loading
console.log('Testing Firebase configuration...');

try {
  const firebaseModule = await import('./lib/firebase.js');
  console.log('Firebase module loaded:', firebaseModule);

  if (firebaseModule.app && firebaseModule.auth) {
    console.log('Firebase app and auth initialized successfully');
  } else {
    console.error('Firebase initialization failed');
  }
} catch (error) {
  console.error('Error importing Firebase:', error);
}