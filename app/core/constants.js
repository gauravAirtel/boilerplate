

module.exports = {

    DEFAULT: {
        PORT: 9000,
        GET_QUERY_LIMIT: 1000,
        GET_QUERY_OFFSET: 0,
    },
    API_ENDPOINTS: {

    },

    APP_USER_TYPE: {
        USER: 'USER',
        ADMIN: 'ADMIN',
    },

    PATH: {
        LOG: `${rootDir}/logs/`,
        USER: '/api/v1/user',
        CHAT: '/api/v1/chat',
        COMMON: '/api/v1/common',
        MONITOR: '/api/v1/monitor'
    },

    WHITELIST_PATH: [
        `/api/v1/user/signup`,
        `/api/v1/user/signin`,
        `/api/v1/common/multer-upload`
    ],

    RESPONSE_MESSAGES: {
        USER_CREATED: 'User created successfully',
        DATA_FETCHED: 'Data fetched successfully.',
        SIGNIN_SUCCESS: 'Successfully signed in.',
        FILE_UPLOAD_SUCCESS: 'File uploaded successfully',
        GROUP_CREATED: 'Group created successfully',
        CONVERSATIONS_FETCED: 'Conversations fetched successfully',
        MESSAGES_FETCED: 'Messages fetched successfully'
    },

    VALIDATION_ERRORS: {
        REQUIRED_FIELD: 'This field is required.',
        INVALID_EMAIL: 'Email is not valid.',
        INVALID_PASSWORD: 'Password is not valid.',
        INVALID_NAME: 'Name is not valid.',
        INVALID_COUNTRY_CODE: 'Country code is not valid.',
        INVALID_MOBILE: 'Mobile number is not valid',
        PASSWORD_TO_SHORT: 'Password is too short',
    },

    FILE_UPLOAD: {
        DEFAULT_STORAGE_PATH: `${rootDir}/assets/source`,
        DEFAULT_DESTINATION_PATH: `${rootDir}/assets/destination`,
        ALLOWED_DOCUMENT_TYPES: ['.png', '.jpg', '.gif', '.jpeg', '.pdf'],
        ALLOWED_DOCUMENT_SIZE: 1 * 1024 * 1024, // 1MB
    },
    TABLES: {
        USERS: 'users',
        CONVERSATIONS: 'conversations',
        PARTICIPANTS: 'participants',
        MESSAGES: 'messages',
    },
    PARTICIPANTS_TYPE: {
        SINGLE: 'single',
        GROUP: 'group'
    }
};
