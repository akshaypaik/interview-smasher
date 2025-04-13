import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const SlidderToggle = ({ slidderInfo, enableQuickFilter, setEnableQuickFilter }) => {

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(enableQuickFilter[slidderInfo?.id]);
    }, [enableQuickFilter])

    const handleCheckedChange = (e) => {
        const updateEnableQuickFilter = (prev) => {

            const updatedList = { ...prev };

            updatedList[slidderInfo?.id] = !prev[slidderInfo?.id];

            Object.keys(updatedList).forEach(key => {
                if (key != slidderInfo.id.toString()) {
                    updatedList[key] = false;
                }
            });

            setIsChecked(updatedList[slidderInfo?.id]);
            return updatedList;

        };

        setEnableQuickFilter((prev) => updateEnableQuickFilter(prev));
        console.log(enableQuickFilter);

    }

    return (
        <div className="flex items-center space-x-2 cursor-pointer">
            <Switch id={slidderInfo.name} className="cursor-pointer" checked={isChecked} onCheckedChange={(e) => handleCheckedChange(e)} />
            <Label htmlFor={slidderInfo.name} className="cursor-pointer">{slidderInfo?.displayName}</Label>
        </div>
    )
}

export default SlidderToggle;