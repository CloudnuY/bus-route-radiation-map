import { StateCreator, create } from 'zustand';

export interface LineData {
    id: string;
    path: AMap.LngLat[];
    citycode: string;
    basic_price: string;
    total_price: string;
    // encode json
    stime: string;
    etime: string;
    name: string;
    start_stop: string;
    end_stop: string;
    uicolor: string;
    via_stops: {
        location: AMap.LngLat;
        id: string;
        name: string;
        sequence: number;
    }[];
}

export interface AMapLineExtData {
    id: string;
    lineData: LineData[];
    index: number;
    color: string;
}

export interface StoreStates {
    /**
     * 选中的线路
     */
    selectionLine?: AMapLineExtData;
    /**
     * 查询中心点
     */
    center?: AMap.LngLat | Omit<BMapGL.Point, 'equals'>;

    stations?: (
        | {
              location: AMap.LngLat;
              id: string;
              name: string;
              address: string;
              type: string;
              citycode: string;
          }
        | BMapGL.LocalResultPoi
    )[];

    /**
     * 查询配置
     */
    queryConfig?: {
        radius: number;
    };
}

export interface StoreActions {
    setSelectionLine: (line?: AMapLineExtData) => void;
    setCenter: (poi: AMap.LngLat | Omit<BMapGL.Point, 'equals'>) => void;
    setQueryConfig: (config: StoreStates['queryConfig']) => void;
    setStations: (stations: StoreStates['stations']) => void;
}

const store: StateCreator<StoreStates & StoreActions> = (set, get) => {
    return {
        selectionLine: undefined,
        queryConfig: {
            radius: 500,
        },
        setSelectionLine: (line) => set({ selectionLine: line }),
        setCenter: (poi) => {
            set({ center: poi });
        },
        setQueryConfig: (config) => {
            set({ queryConfig: config });
        },
        setStations: (stations) => {
            set({ stations });
        },
    };
};

export const useBusLineStore = create<StoreStates & StoreActions>()(store);
