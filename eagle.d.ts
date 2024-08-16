/* eslint-disable @typescript-eslint/no-explicit-any */
// declare const eagle: {
//     folder: {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         get: (params: { id: string }) => Promise<any>;
//     };
//     item: {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         get: (params: { folders: any[] }) => Promise<any>;
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         getById(params: { id: string }): Promise<any>;
//     };
// };

import * as f from 'fs'
declare global {
    interface Window {
        fs: f;
        eagle: {
            folder: {
                get: (params: { id: string }) => Promise<any>,
                getSelected: () => Promise<any>
            };
            item: {
                get: (params: { folders: any[] }) => Promise<any>;
                getById: (params: { id: string }) => Promise<any>;
                getByIds: (param:string[]) => Promise<any>; 
            };
        };
    }
}