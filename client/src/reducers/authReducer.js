//lưu trữ trạng thái của app liên quan đến việc xác thực ng dùng
export const authReducer = (state, action) => {
    const {
        type, 
        payload: { isAuthenticated, user}
    } = action;
    switch (type) {
        case 'SET AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
            
            break;

        default:
            return state;
    
    }
}