import React, { useEffect, useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './calendar-event-utils';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './UpcomingInterviews.css';
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import { GET_UPCOMING_INTERVIEWS } from '../../utils/constants/apiConstants'

export default function UpcomingInterviews() {
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false) // State for dialog visibility
    const [selectedDate, setSelectedDate] = useState(null) // State for selected date

    const userInfo = useSelector((store) => store.app.userInfo);
    const [initialEvents, setInitialEvents] = useState([]);

    useEffect(() => {
        if (userInfo?.email) {
            fetchUpcomingInterviews();
        }
    }, [userInfo]);

    const fetchUpcomingInterviews = async () => {
        try {
            const { data } = await axios.get(`${GET_UPCOMING_INTERVIEWS}${userInfo.email}`);
            console.log("data: ", data);
            const updatedData = data.map((item) => {
                return {
                    id: createEventId(),
                    title: `${item.company}`,
                    start: new Date(item.createdOn).toISOString(),
                    extendedProps: {
                        role: item.jobRole,
                        company: item.company,
                        companyURL: item.companyIconURL
                    }
                }
            })
            setInitialEvents(updatedData);
        } catch (error) {
            toast.error(error);
        }
    }

    function handleDateSelect(selectInfo) {
        setSelectedDate(selectInfo) // Save selected date info
        // setDialogOpen(true) // Open the dialog
    }

    function handleEventClick(clickInfo) {
        // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //     clickInfo.event.remove()
        // }
    }

    function handleEvents(events) {
        setCurrentEvents(events)
    }

    function handleSaveEvent() {
        let title = document.getElementById('event-title').value;
        let company = document.getElementById('event-company').value;
        if (selectedDate) {
            let calendarApi = selectedDate.view.calendar

            calendarApi.unselect() // Clear date selection

            if (title && company) {
                calendarApi.addEvent({
                    id: createEventId(),
                    title,
                    company,
                    start: selectedDate.startStr,
                    end: selectedDate.endStr,
                    allDay: selectedDate.allDay
                })
            }
        }
        INITIAL_EVENTS.push({
            id: createEventId(),
            title,
            company,
            start: new Date()
        })
        setDialogOpen(false) // Close the dialog
    }

    return (
        <div className='p-8 w-3/4'>
            <h1 className='text-4xl font-bold'>Upcoming Interviews</h1>
            <div className='p-4'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    weekends={weekendsVisible}
                    events={initialEvents}
                    select={handleDateSelect}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                    eventsSet={handleEvents}
                />
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen} disableEnforceFocus className="w-[800px]">
                    <DialogContent className="w-full">
                        <DialogHeader>
                            <DialogTitle>Add Event</DialogTitle>
                            <DialogDescription>
                                Enter details for your new event below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="event-title" className="text-right">
                                    Title
                                </Label>
                                <Input id="event-title" placeholder="Event title" className="col-span-3" />
                                <Label htmlFor="event-company" className="text-right">
                                    Company
                                </Label>
                                <Input id="event-company" placeholder="Company Name" className="col-span-3" />
                                <div style={{ width: '320px' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker label="Basic date time picker" disablePortal={false} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" onClick={handleSaveEvent}>Save Event</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

function renderEventContent(eventInfo) {
    const start = eventInfo.event.start;
    const formattedTime = start
        ? start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()
        : eventInfo.timeText;
    return (
        <div className='flex flex-col'>
            <b>{formattedTime}</b>
            <span className='flex gap-2'>
                {eventInfo.event.extendedProps.companyURL ? <img className='h-8' src={eventInfo.event.extendedProps.companyURL}
                    alt='company-logo' /> : <span>{eventInfo.event.extendedProps.company}</span>}
            </span>
            <div>{eventInfo.event.extendedProps.role}</div>
        </div>
    )
}