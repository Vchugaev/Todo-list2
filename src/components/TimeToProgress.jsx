import React, { useEffect, useState } from "react";
import * as Progress from '@radix-ui/react-progress';
import * as HoverCard from '@radix-ui/react-hover-card';
import alertStyle from '../Radix/alert.module.css'



export default function TimeToProgress({ props }) {
    const endDate = new Date(`${props.date}T${props.time}`)
    const endTimeInSeconds = Math.floor(endDate.getTime() / 1000)

    const startDate = new Date(props.id)
    const startTimeInSeconds = Math.floor(startDate.getTime() / 1000)

    let dateInSeconds

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            const currentTimeInSeconds = Math.floor(currentDate.getTime() / 1000);
            const calculatedProgress = Math.round((currentTimeInSeconds - startTimeInSeconds) / (endTimeInSeconds - startTimeInSeconds) * 100);
            setProgress(calculatedProgress);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [startTimeInSeconds, endTimeInSeconds]);

    const [progress, setProgress] = useState((Math.round((dateInSeconds - startTimeInSeconds) / (endTimeInSeconds - startTimeInSeconds) * 100)))

    return <>

        <HoverCard.Root openDelay={100} closeDelay={0}>
            <HoverCard.Trigger className="w-full h-full flex">
                <Progress.Root className="bg-grey w-full h-5 m-auto rounded-full overflow-hidden" max={endTimeInSeconds} value={dateInSeconds}>
                    <Progress.Indicator className="bg-yellow w-full h-full transition ease-out delay-0 duration-1000" style={{ transform: `translateX(-${progress}%)` }} />
                </Progress.Root>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content className="animate-hoverDialog" >
                    <HoverCard.Arrow />
                    <div className="bg-black-grey p-1 rounded text-white"><p>Прошло {progress}% времени</p></div>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>



    </>
}