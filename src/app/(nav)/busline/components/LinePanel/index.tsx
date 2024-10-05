'use client';

import { Icon } from '@iconify/react';
import { Button, Tabs, Tab } from '@nextui-org/react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useBusLineStore } from '../../store';
import { useAppStore } from '@/store';

export default function LinePanel() {
    const { selection, setSelectionLine } = useBusLineStore((state) => ({
        selection: state.selectionLine,
        setSelectionLine: state.setSelectionLine,
    }));

    useEffect(() => {
        if (selection) {
            console.log('selection', selection);
        }
    }, [selection]);

    const handleClose = () => {
        setSelectionLine(undefined);
    };

    return (
        <div
            className={classNames(
                'bg-white h-full rounded-sm shadow relative',
                {
                    'w-0 overflow-hidden': !selection,
                    'w-[300px]': selection,
                },
            )}
        >
            <div className="p-4 h-full flex flex-col">
                <Button
                    isIconOnly
                    radius="full"
                    className="absolute top-2 right-2 bg-white text-2xl"
                    onClick={handleClose}
                >
                    <Icon icon="material-symbols:close-rounded" />
                </Button>
                <h2 className="text-lg font-medium">线路详情</h2>

                {selection && (
                    <div className="mt-4 flex-grow">
                        <Tabs
                            classNames={{
                                base: 'overflow-auto w-full',
                                tabList: 'flex-none',
                            }}
                        >
                            {selection.lineData.map((line, index) => (
                                <Tab key={line.id} title={line.name}>
                                    <p className="text-gray-700">
                                        <span className="font-semibold mr-1">
                                            起点
                                        </span>
                                        {line.start_stop}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-semibold mr-1">
                                            终点
                                        </span>
                                        {line.end_stop}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-semibold mr-1">
                                            票价
                                        </span>
                                        {line.basic_price}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-semibold mr-1">
                                            时间
                                        </span>
                                        {line.stime.slice(0, 2)}:
                                        {line.stime.slice(2, 4)}-
                                        {line.etime.slice(0, 2)}:
                                        {line.etime.slice(2, 4)}
                                    </p>
                                    <h3 className="font-bold">途经</h3>
                                    <ul className="relative mt-2">
                                        <div
                                            className="absolute left-1.5 top-0 w-1 h-full"
                                            style={{
                                                backgroundColor:
                                                    selection.color,
                                            }}
                                        ></div>
                                        {line.via_stops.map(
                                            (stop, stopIndex) => (
                                                <li
                                                    key={stopIndex}
                                                    className="flex items-center py-0.5"
                                                >
                                                    <span
                                                        className="w-4 h-4 border-3 rounded-full mr-1.5 bg-white z-10"
                                                        style={{
                                                            borderColor:
                                                                selection.color,
                                                        }}
                                                    ></span>
                                                    {stop.name}
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </Tab>
                            ))}
                        </Tabs>
                    </div>
                )}
            </div>
        </div>
    );
}
