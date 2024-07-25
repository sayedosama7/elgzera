/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CategoryIcon from '@mui/icons-material/Category';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SailingIcon from '@mui/icons-material/Sailing';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentIcon from '@mui/icons-material/Payment';
import { IconButton } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
        position: 'relative',
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
    display: 'flex',
    justifyContent: 'flex-end', // لمحاذاة الأيقونة إلى اليمين
    background: 'none', // لجعل الخلفية شفافة
    boxShadow: 'none', // لإزالة أي ظل
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(!isMobile); // Set initial state based on screen size

    React.useEffect(() => {
        setOpen(!isMobile);
    }, [isMobile]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ 
                    ...(open && { display: 'none' }), 
                    color: "#000",
                    backgroundColor: '#ecf0f5', 
                    position: 'absolute', 
                    right: '30px',
                    top: 16,
                    '&:hover': {
                        backgroundColor: '#d3e0ea', 
                    }
                }}
            >
                    <MenuIcon />
                </IconButton>
            </AppBar>
            <Main open={open}>
                {/* محتوى الصفحة هنا */}
            </Main>
            <Drawer
                className='color'
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader sx={{ backgroundColor: "#fcf7f7" }}>
                    <IconButton sx={{ color: "#000" }} onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <img style={{ width: "64%" }} src='\imgs\orane.png' />
                </DrawerHeader>
                <Divider />
                <List sx={{ backgroundColor: "#fcf7f7", height: "100%" }} >
                    <ListItem disablePadding onClick={() => navigate("/Home")}>
                        <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListItemIcon>
                                <SpaceDashboardIcon className='icon-edit' />
                            </ListItemIcon>
                            <span className='span-edit'>الرئيسية</span>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => navigate("/AllTickets")}>
                        <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListItemIcon>
                                <ConfirmationNumberIcon className='icon-edit' />
                            </ListItemIcon>
                            <span className='span-edit'>اضافة تذكرة</span>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => navigate("/AllCategories")}>
                        <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListItemIcon>
                                <CategoryIcon className='icon-edit' />
                            </ListItemIcon>
                            <span className='span-edit'>فئات التذاكر</span>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/AllTourGuides")}>
                        <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListItemIcon>
                                <EmojiPeopleIcon className='icon-edit' />
                            </ListItemIcon>
                            <span className='span-edit'>المرشدين</span>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/AllCruises")}>
                        <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListItemIcon>
                                <SailingIcon className='icon-edit' />
                            </ListItemIcon>
                            <span className='span-edit'>المراكب</span>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/AllPlaces")}>
                        <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListItemIcon>
                                <ApartmentIcon className='icon-edit' />
                            </ListItemIcon>
                            <span className='span-edit'>مراكز البيع</span>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/AllProducts")}>
                        <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListItemIcon>
                                <ProductionQuantityLimitsIcon className='icon-edit' />
                            </ListItemIcon>
                            <span className='span-edit'>المنتجات</span>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/AllReservation")}>
                        <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListItemIcon>
                                <BookOnlineIcon className='icon-edit' />
                            </ListItemIcon>
                            <span className='span-edit'>مواعيد الحجز</span>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate("/PayingOff")}>
                        <ListItemButton sx={{ flexDirection: 'row-reverse', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListItemIcon>
                                <PaymentIcon className='icon-edit' />
                            </ListItemIcon>
                            <span className='span-edit'>الدفع</span>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}
