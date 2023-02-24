export interface BaseStateInterface {
    error: string;
    stateStatus: 'pending' | 'loading' | 'error' | 'success'
}