'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { mockNotifications } from '@/lib/mock-data';

const navItems = [
  { label: 'Today', href: '/today', icon: TodayRoundedIcon },
  { label: 'Program', href: '/program', icon: FitnessCenterRoundedIcon },
  { label: 'History', href: '/history', icon: HistoryRoundedIcon },
  { label: 'Alerts', href: '/notifications', icon: NotificationsOutlinedIcon },
  { label: 'Profile', href: '/profile', icon: PersonOutlinedIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 100,
        px: 1,
      }}
    >
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = href === '/today'
          ? pathname === '/today' || pathname === '/'
          : pathname.startsWith(href);
        return (
          <Link key={href} href={href} style={{ textDecoration: 'none', flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25, py: 0.5 }}>
              <Badge badgeContent={label === 'Alerts' ? unread : 0} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: 9, minWidth: 14, height: 14 } }}>
                <Icon sx={{ fontSize: 22, color: isActive ? 'primary.main' : 'text.secondary' }} />
              </Badge>
              <Typography variant="caption" sx={{ fontSize: 10, color: isActive ? 'primary.main' : 'text.secondary', fontWeight: isActive ? 600 : 400, lineHeight: 1 }}>
                {label}
              </Typography>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}
