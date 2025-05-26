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
                    <div>
                        {info?.isReferral && <span className="absolute top-[-1px] px-4 py-0.5 rounded-lg max-h-8 left-0 
                        bg-orange-500 font-semibold text-xs">
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