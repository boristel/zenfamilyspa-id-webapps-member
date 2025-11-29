import api from '../lib/axios';

export const strapiService = {
  /**
   * Find user by Firebase UID
   * @param {string} firebaseUid - Firebase user ID
   * @returns {Promise<Object|null>} User object or null if not found
   */
  async findUserByFirebaseUid(firebaseUid) {
    try {
      const response = await api.get('/users', {
        params: {
          'filters[firebase_uid][$eq]': firebaseUid
        }
      });
      return response.data?.[0] || null;
    } catch (error) {
      console.error('Error finding user by Firebase UID:', error);
      return null;
    }
  },

  /**
   * Find user by Email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null if not found
   */
  async findUserByEmail(email) {
    try {
      const response = await api.get('/users', {
        params: {
          'filters[email][$eq]': email
        }
      });
      return response.data?.[0] || null;
    } catch (error) {
      console.error('Error finding user by Email:', error);
      return null;
    }
  },

  /**
   * Create new user in Strapi
   * @param {Object} userData - User data to create
   * @returns {Promise<Object>} Created user object
   */
  async createUser(userData) {
    try {
      // 1. Register with minimal fields (username, email, password)
      // We use firebase_uid as the password for the shadow user
      const registerResponse = await api.post('/auth/local/register', {
        username: userData.username,
        email: userData.email,
        password: userData.firebase_uid,
      });

      // 2. Save JWT token
      const { jwt, user } = registerResponse.data;
      if (jwt) {
        localStorage.setItem('strapi_jwt', jwt);
      }

      // 3. Update the user with additional fields (firebase_uid, etc.)
      if (user && user.id) {
          try {
              await api.put(`/users/${user.id}`, {
                  firebase_uid: userData.firebase_uid,
                  has_pin_setup: userData.has_pin_setup,
                  pin_hash: userData.pin_hash
              });
          } catch (updateError) {
              console.error('Error updating user details after registration (likely permissions):', updateError);
          }
      }

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      console.error('Error details:', error.response?.data);
      throw error;
    }
  },

  /**
   * Login user to get token
   * @param {string} identifier - Email or username
   * @param {string} password - Password (firebase_uid)
   * @returns {Promise<Object>} User object with custom fields
   */
  async login(identifier, password) {
    try {
      const response = await api.post('/auth/local', {
        identifier,
        password
      });

      if (response.data.jwt) {
        localStorage.setItem('strapi_jwt', response.data.jwt);
      }

      // Fetch full user profile to get custom fields (has_pin_setup, pin_hash, etc.)
      const userId = response.data.user.id;
      const fullProfile = await this.getUserProfile(userId);
      
      return fullProfile;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  /**
   * Update user PIN
   * @param {number} userId - Strapi user ID
   * @param {string} pinHash - Hashed PIN
   * @returns {Promise<Object>} Updated user object
   */
  async updateUserPin(userId, pinHash) {
    if (!userId) {
      throw new Error('Cannot update PIN: User ID is missing');
    }
    try {
      const response = await api.put(`/users/${userId}`, {
        has_pin_setup: true,
        pin_hash: pinHash
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user PIN:', error);
      console.error('Error details:', error.response?.data);
      throw error;
    }
  },

  /**
   * Verify PIN against stored hash
   * @param {number} userId - Strapi user ID
   * @param {string} pinHash - Hashed PIN to verify
   * @returns {Promise<boolean>} True if PIN matches
   */
  async verifyPin(userId, pinHash) {
    try {
      const response = await api.get(`/users/${userId}`);
      const storedHash = response.data.pin_hash;
      return storedHash === pinHash;
    } catch (error) {
      console.error('Error verifying PIN:', error);
      return false;
    }
  },

  /**
   * Get user profile by ID
   * @param {number} userId - Strapi user ID
   * @returns {Promise<Object>} User profile object
   */
  async getUserProfile(userId) {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }
};
