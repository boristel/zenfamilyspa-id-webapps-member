# Authentication & PIN Security Implementation

## Overview
This document summarizes the implementation of user authentication with Strapi backend integration and 6-digit PIN security system for the Zen Family Spa member web application.

## Features Implemented

### 1. Strapi Backend Integration
- **User Synchronization**: Automatic sync between Firebase Authentication and Strapi CMS
- **Shadow User Creation**: Creates corresponding Strapi users for Firebase-authenticated users
- **Custom User Fields**: Extended Strapi user model with `firebase_uid`, `has_pin_setup`, and `pin_hash`
- **JWT Token Management**: Automatic token storage and inclusion in API requests

### 2. PIN Security System
- **6-Digit PIN Setup**: Users set up a secure 6-digit PIN after registration
- **PIN Verification**: Session-based PIN verification for accessing protected routes
- **PIN Hashing**: Secure SHA-256 hashing of PIN codes before storage
- **Session Management**: PIN verification persists for the browser session

### 3. Authentication Flow
```
Registration → Firebase Auth → Strapi Sync → PIN Setup → Dashboard Access
                                                    ↓
Login → Firebase Auth → Strapi Sync → PIN Verification → Dashboard Access
```

## Technical Implementation

### Files Modified/Created

#### Core Services
- **`src/lib/axios.js`**: Added JWT token interceptor for authenticated requests
- **`src/services/strapi.js`**: Implemented Strapi API service with methods:
  - `login()`: Authenticate and fetch full user profile
  - `createUser()`: Two-phase user registration (register + update custom fields)
  - `findUserByFirebaseUid()`: Find user by Firebase UID
  - `findUserByEmail()`: Find user by email
  - `updateUserPin()`: Update user's PIN hash
  - `verifyPin()`: Verify PIN against stored hash
  - `getUserProfile()`: Fetch complete user profile

#### Context & State Management
- **`src/context/AuthContext.jsx`**: Enhanced with:
  - `syncWithStrapi()`: Multi-step user resolution (login → find by UID → find by email → create)
  - Error state management and UI error display
  - Comprehensive debug logging
  - Profile state with Strapi user data

#### Components
- **`src/components/auth/RequireAuth.jsx`**: Route protection with:
  - Loading state during authentication
  - Profile sync waiting state (fixes race condition)
  - PIN setup requirement check
  - Session-based PIN verification check

#### Pages
- **`src/pages/SetupPinPage.jsx`**: 
  - Two-step PIN entry (enter + confirm)
  - Authentication error display
  - Retry sync mechanism
  - Loading and auth state handling

- **`src/pages/VerifyPinPage.jsx`**: 
  - PIN verification for session access
  - Session storage management

## Key Fixes & Solutions

### 1. Strapi Permission Configuration
**Problem**: 403 Forbidden errors on all Strapi API calls

**Solution**: Configured Strapi roles with required permissions:
- **Public Role**:
  - `Users-permissions → Auth → register`
  - `Users-permissions → User → find`
- **Authenticated Role**:
  - `Users-permissions → User → find`
  - `Users-permissions → User → update`
  - `Users-permissions → User → findOne`

### 2. Custom Fields Not Retrieved
**Problem**: `has_pin_setup` was `undefined` after login

**Solution**: Modified `strapiService.login()` to fetch full user profile after authentication:
```javascript
const response = await api.post('/auth/local', { identifier, password });
const userId = response.data.user.id;
const fullProfile = await this.getUserProfile(userId);
return fullProfile; // Returns user with custom fields
```

### 3. PIN State Not Persisting
**Problem**: App kept asking for PIN setup even after it was configured

**Solution**: Fixed race condition in `RequireAuth.jsx`:
```javascript
// Wait for profile sync to complete
if (user && !profile) {
    return <LoadingState message="Syncing profile..." />;
}
```

### 4. Two-Phase User Creation
**Problem**: Strapi `/auth/local/register` doesn't accept custom fields

**Solution**: Implemented two-phase creation:
1. Register with minimal fields (username, email, password)
2. Update user with custom fields using obtained JWT token

## Strapi Configuration Requirements

### User Collection Custom Fields
Add these fields to the Strapi User collection:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `firebase_uid` | Text | No | Firebase user ID for linking |
| `has_pin_setup` | Boolean | No | Whether user has set up PIN |
| `pin_hash` | Text | No | SHA-256 hash of user's PIN |

### Role Permissions
Configure in Strapi Admin Panel → Settings → Roles:

**Public**:
- ✅ Users-permissions → Auth → register
- ✅ Users-permissions → User → find

**Authenticated**:
- ✅ Users-permissions → User → find
- ✅ Users-permissions → User → update
- ✅ Users-permissions → User → findOne

## Security Considerations

1. **PIN Hashing**: All PINs are hashed using SHA-256 before storage
2. **Session-Based Verification**: PIN verification is session-scoped, requiring re-verification after logout
3. **JWT Token Management**: Tokens are stored in localStorage and automatically included in requests
4. **Password as UID**: Firebase UID is used as the Strapi password for shadow users

## Testing Checklist

- [x] User registration creates Firebase and Strapi accounts
- [x] PIN setup saves hashed PIN to Strapi
- [x] Logout clears session PIN verification
- [x] Re-login retrieves user profile with `has_pin_setup: true`
- [x] PIN verification grants access to protected routes
- [x] Session persistence maintains PIN verification state
- [x] Error states display meaningful messages to users

## Known Issues & Limitations

1. **WebSocket Warning**: Harmless Vite HMR WebSocket connection warning in console (development only)
2. **Login 403 Error**: Strapi login fails with 403 if user doesn't exist yet (expected, falls back to user creation)
3. **Google Sign-In CORS**: Cross-Origin-Opener-Policy warnings (cosmetic, doesn't affect functionality)

## Future Enhancements

- [ ] PIN reset functionality
- [ ] Biometric authentication option
- [ ] Remember device feature
- [ ] PIN attempt limiting
- [ ] Account lockout after failed attempts
- [ ] Email verification integration
- [ ] Password recovery flow

## Environment Variables

Ensure these are set in your `.env` file:

```env
VITE_STRAPI_URL=http://localhost:1337
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

## Deployment Notes

1. Update `VITE_STRAPI_URL` to production Strapi URL
2. Ensure Strapi production instance has same role permissions
3. Verify custom user fields exist in production Strapi
4. Test authentication flow in production environment
5. Monitor Strapi API rate limits and quotas

## Support & Debugging

### Common Issues

**Issue**: "Authentication Error: Forbidden"
- **Cause**: Missing Strapi permissions
- **Fix**: Configure Public/Authenticated role permissions as documented above

**Issue**: "Cannot update PIN: User ID is missing"
- **Cause**: Profile not synced before PIN setup attempt
- **Fix**: Ensure `RequireAuth` waits for profile sync (already implemented)

**Issue**: App keeps asking for PIN setup
- **Cause**: Race condition in route protection
- **Fix**: Already fixed with profile sync waiting state

### Debug Logging

Enable verbose logging by checking browser console for:
- `"Syncing with Strapi for: <email>"`
- `"User profile data:"` - Shows full user object with custom fields
- `"RequireAuth - Checking PIN setup. Profile:"` - Shows route protection logic

---

**Implementation Date**: November 29, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
