export type ApiCallType = 'state' | 'capital' | 'lga' | 'unknown' | 'invalid';

// Optional array if you want to sync with api_call_types seed
export const API_CALL_TYPES: { type: ApiCallType; description: string }[] = [
    { type: 'state', description: 'State name match' },
    { type: 'capital', description: 'Capital city match' },
    { type: 'lga', description: 'Local Government Area match' },
    { type: 'unknown', description: 'No match found' },
    { type: 'invalid', description: 'Empty or malformed input' }
];
export const API_CALL_TYPE_SET = new Set(API_CALL_TYPES.map((c) => c.type));