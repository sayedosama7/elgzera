import React, { useState, useEffect } from 'react';
import Drawer from '../../Components/Drawer';
import {
    Box, FormControl, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter,
    Paper, Button, IconButton, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, InputAdornment
} from '@mui/material';
import QRCode from 'react-qr-code';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

export default function PayingOff() {
    const [selectedNationality, setSelectedNationality] = useState("مصري");
    const [selectedGuideName, setSelectedGuideName] = useState("");
    const [selectedBoatName, setSelectedBoatName] = useState("");
    const [selectedTicketCategories, setSelectedTicketCategories] = useState({});
    const [tickets, setTickets] = useState([]);
    const [showQRCodes, setShowQRCodes] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [addGuideDialog, setAddGuideDialog] = useState(false);
    const [addBoatDialog, setAddBoatDialog] = useState(false);
    const [guideData, setGuideData] = useState({
        name: '',
        email: '',
        status: '',
        phoneNumber: '',
        profitPercentage: ''
    });
    const [boatData, setBoatData] = useState({
        name: '',
        status: ''
    });
    const [guides, setGuides] = useState([]);
    const [boats, setBoats] = useState([]);
    const [nationalities, setNationalities] = useState([]);

    const ticketCategories = {
        "مصري": [
            { name: "تذكرة عادية", price: 100 },
            { name: "تذكرة VIP", price: 200 },
        ],
        // Add more nationalities and categories as needed
    };

    useEffect(() => {
        fetchGuides();
        fetchBoats();
        fetchNationalities();
    }, []);

    const fetchGuides = async () => {
        try {
            const response = await axios.get('http://org-bay.runasp.net/api/TourGuides');
            setGuides(response.data);
        } catch (error) {
            console.error("There was an error fetching the guides!", error);
        }
    };

    const fetchBoats = async () => {
        try {
            const response = await axios.get('http://org-bay.runasp.net/api/Cruises');
            setBoats(response.data);
        } catch (error) {
            console.error("There was an error fetching the boats!", error);
        }
    };

    const fetchNationalities = async () => {
        try {
            const response = await axios.get('http://org-bay.runasp.net/api/Payings');
            setNationalities(response.data);
            console.log(setNationalities);
        } catch (error) {
            console.error("There was an error fetching the nationalities!", error);
        }
    };

    const handleAddTicket = (category) => {
        const newTicket = {
            nationality: selectedNationality,
            guideName: selectedGuideName,
            ticketType: category.name,
            ticketPrice: category.price,
            boatName: selectedBoatName,
            ticketCount: 1
        };

        setSelectedTicketCategories({ ...selectedTicketCategories, [category.name]: true });
        setTickets([...tickets, newTicket]);
    };

    const handleDeleteTicket = (index, ticketType) => {
        const updatedTickets = tickets.filter((ticket, i) => i !== index);
        setSelectedTicketCategories({ ...selectedTicketCategories, [ticketType]: false });
        setTickets(updatedTickets);
    };

    const handleIncreaseTicketCount = (index) => {
        const updatedTickets = [...tickets];
        updatedTickets[index].ticketCount++;
        setTickets(updatedTickets);
    };

    const handleDecreaseTicketCount = (index) => {
        const updatedTickets = [...tickets];
        if (updatedTickets[index].ticketCount > 1) {
            updatedTickets[index].ticketCount--;
            setTickets(updatedTickets);
        }
    };

    const handlePayment = () => {
        setShowQRCodes(true);
        postPayings();
    };

    const postPayings = async () => {
        const payingsData = tickets.map(ticket => {
            const nationality = nationalities.find(nat => nat.name === ticket.nationality);
            const guide = guides.find(guide => guide.name === ticket.guideName);
            const boat = boats.find(boat => boat.name === ticket.boatName);

            if (!nationality || !guide || !boat) {
                console.error("Error: Missing data for payment.", { nationality, guide, boat });
                return null;
            }

            return {
                nationalityId: nationality.id,
                tourGuideId: guide.id,
                cruiseId: boat.id,
                amount: ticket.ticketPrice * ticket.ticketCount
            };
        }).filter(payment => payment !== null); // Remove any null entries

        try {
            await axios.post('http://org-bay.runasp.net/api/Cruises', { payings: payingsData });
            // handle success if needed
        } catch (error) {
            console.error("There was an error posting the payment data!", error);
        }
    };


    const handleCloseDialog = () => {
        setShowQRCodes(false);
        setTickets([]);
        setSelectedNationality("");
        setSelectedGuideName("");
        setSelectedBoatName("");
        setSelectedTicketCategories({});
    };

    const handlePrint = () => {
        window.print();
    };

    const total = tickets.reduce((acc, curr) => acc + curr.ticketPrice * curr.ticketCount, 0);

    return (
        <div>
            <Drawer />
            <Box height={0} sx={{ direction: "rtl" }} />
            <Box sx={{ width: "80%", marginTop: "-30px" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'></div>
                        <div className='col-md-6'></div>
                    </div>
                </div>
                <div className='card table-style ' style={{ direction: "rtl" }}>
                    <div className="card-header table-head-style d-flex">
                        <h3>حجز تذكرة</h3>
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className='col-md-4 mt-1'>
                                    <label htmlFor="nationality" className="d-flex">الجنسية</label>
                                    <Select id="nationality" value={selectedNationality} onChange={(e) => setSelectedNationality(e.target.value)} className="form-control">
                                        {Object.keys(ticketCategories).map((nationality, index) => (
                                            <MenuItem key={index} value={nationality}>{nationality}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className='col-md-4 '>
                                    <label htmlFor="guideName" className="d-flex">
                                        اسم المرشد
                                        <IconButton onClick={() => setAddGuideDialog(true)}>
                                            <AddIcon className='addIcon' />
                                        </IconButton>
                                    </label>
                                    <Select id="guideName" value={selectedGuideName} onChange={(e) => setSelectedGuideName(e.target.value)} className="form-control">
                                        {guides.map((option, index) => (
                                            <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className='col-md-4 mt-1'>
                                    <label htmlFor="boatName" className="d-flex">
                                        اسم المركب
                                        <IconButton onClick={() => setAddBoatDialog(true)}>
                                            <AddIcon className='addIcon' />
                                        </IconButton>
                                    </label>
                                    <Select id="boatName" value={selectedBoatName} onChange={(e) => setSelectedBoatName(e.target.value)} className="form-control">
                                        {boats.map((option, index) => (
                                            <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                                {ticketCategories[selectedNationality]?.map((category, index) => (
                                    <div key={index} className='col-md-3 mt-4'>
                                        <div className="d-flex flex-column align-items-center ticket">
                                            <IconButton disabled={selectedTicketCategories[category.name]} onClick={() => handleAddTicket(category)}>
                                                <PersonIcon sx={{ color: "#000", fontSize: "55px" }} />
                                            </IconButton>
                                            <span>{category.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <TableContainer className='table-style table table-hover' sx={{ direction: "rtl" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className='table-head-style'>
                                <TableRow>
                                    <TableCell style={{ color: "#fff" }} align="right">الجنسية</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">اسم المرشد</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">نوع التذكرة</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">سعر التذكرة</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">اسم المركب</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">عدد التذاكر</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="right">حذف</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map((ticket, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="right">{ticket.nationality}</TableCell>
                                        <TableCell align="right">{ticket.guideName}</TableCell>
                                        <TableCell align="right">{ticket.ticketType}</TableCell>
                                        <TableCell align="right">{ticket.price}</TableCell>
                                        <TableCell align="right">{ticket.boatName}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDecreaseTicketCount(index)}>
                                                <RemoveIcon sx={{ backgroundColor: "#c72c2c", borderRadius: "3px", padding: "0px", marginLeft: "5px", color: "#fff" }} />
                                            </IconButton>
                                            {ticket.ticketCount}
                                            <IconButton onClick={() => handleIncreaseTicketCount(index)}>
                                                <AddIcon sx={{ backgroundColor: "#199119", borderRadius: "3px", padding: "0px", marginRight: "5px", color: "#fff" }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDeleteTicket(index, ticket.ticketType)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell sx={{ fontSize: "20px" }} align="right" colSpan={5}>المجموع الكلي</TableCell>
                                    <TableCell sx={{ fontSize: "20px" }} align="right">{total}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>

                </div>

                <div className='container' style={{ width: "87%" }}>
                    <div className="mt-4 mb-5">
                        <Button variant="contained" onClick={handlePayment} startIcon={<PaymentIcon />} style={{ backgroundColor: "#000" }} sx={{ marginRight: "4px", fontSize: "19px" }}>دفع</Button>
                    </div>
                </div>
            </Box>
            <Dialog open={showQRCodes} onClose={handleCloseDialog}>
                <DialogTitle>QR Code(s)</DialogTitle>
                <DialogContent>
                    {tickets.map((ticket, index) => (
                        <div key={index} style={{ textAlign: "center", margin: "10px" }}>
                            <QRCode value={JSON.stringify(ticket)} />
                            <Typography>{`Nationality: ${ticket.nationality}, Guide: ${ticket.guideName}, Boat: ${ticket.boatName}`}</Typography>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePrint} color="primary">Print</Button>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
