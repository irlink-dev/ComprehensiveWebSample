'use client'

import * as React from 'react'
import useOcxEvents from '@/hooks/useOcxEvents'
import ConnectionPanel from '@/components/panels/ConnectionPanel'
import CallPanel from '@/components/panels/CallPanel'
import RecordingPanel from '@/components/panels/RecordingPanel'
import MessagePanel from '@/components/panels/MessagePanel'
import UtilPanel from '@/components/panels/UtilPanel'
import { OcxStateContext } from '@/components/context/OcxStateContext'

declare global {
    interface Window {
        IRWebSocketClient: new () => any
    }
}

const RootPage = () => {

    const [ocx, setOcx] = React.useState<any>(null)

    const ocxStateContext = React.useContext(OcxStateContext)

    React.useEffect(() => {
        const _ocx = new window.IRWebSocketClient()             // 객체 생성.
        const { ocx } = useOcxEvents(_ocx, ocxStateContext)     // 이벤트 정의.
        setOcx(() => ocx)
    }, [])

    const TAB = 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50'
    const TAB_SELECTED = 'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg'

    return (
        <>
            <ConnectionPanel ocx={ocx} />

            <div className="max-w-screen-lg mx-auto mt-5">

                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                        <li className="mr-2">
                            <button className={TAB_SELECTED}>
                                Call Panel
                            </button>
                        </li>
                        <li className="mr-2">
                            <button className={TAB}>
                                Recording Panel
                            </button>
                        </li>
                        <li className="mr-2">
                            <button className={TAB}>
                                Message Panel
                            </button>
                        </li>
                        <li>
                            <button className={TAB}>
                                Util Panel
                            </button>
                        </li>
                    </ul>
                </div>

                <div>
                    <div className="hidden">
                        <CallPanel ocx={ocx} />
                    </div>
                    <div className="hidden">
                        <RecordingPanel ocx={ocx} />
                    </div>
                    <div className="hidden">
                        <MessagePanel ocx={ocx} />
                    </div>
                    <div className="hidden">
                        <UtilPanel ocx={ocx} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RootPage
