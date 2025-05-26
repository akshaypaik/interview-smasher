import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function IconComponentCareerLinks({ info }) {
    return <span className='flex gap-2'>
        {info.companyIconURL ?
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex gap-2">
                        {info?.isReferral && <span className="px-3 py-2 rounded-lg
                        bg-gray-500 font-semibold text-xs text-white">
                            Referral
                        </span>}
                        <img src={info.companyIconURL} alt='company-icon' className='h-8' />
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                    {info.displayName}
                </TooltipContent>
            </Tooltip>
            :
            info.displayName
        }
    </span>
}