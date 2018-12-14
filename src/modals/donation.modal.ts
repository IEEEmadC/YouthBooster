
export interface Donation {

    donor: string;
    projectId: string;
    amount: number;
    unit: string;
    timestamp: number;
    method: string;
    isConfirmed: boolean;

}