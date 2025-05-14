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
                    <img src={info.companyIconURL} alt='company-icon' className='h-8' />
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