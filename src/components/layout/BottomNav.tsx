'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { mockNotifications } from '@/lib/mock-data';

const navItems = [
  { label: 'Program', href: '/program', icon: FitnessCenterRoundedIcon },
  { label: 'Alerts', href: '/notifications', icon: NotificationsOutlinedIcon },
  { label: 'Today', href: '/today', icon: TodayRoundedIcon, center: true },
  { label: 'Stats', href: '/stats', icon: EqualizerRoundedIcon },
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
        height: 72,
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
      {navItems.map(({ label, href, icon: Icon, center }) => {
        const isActive = href === '/today'
          ? pathname === '/today' || pathname === '/'
          : href === '/stats'
          ? pathname === '/stats' || pathname === '/history'
          : pathname.startsWith(href);

        if (center) {
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, mt: -1.5 }}>
                <Box sx={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  bgcolor: isActive ? 'primary.main' : 'action.selected',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive ? '0 4px 12px rgba(103,80,164,0.35)' : '0 2px 6px rgba(0,0,0,0.12)',
                  transition: 'all 0.2s',
                }}>
                  <Icon sx={{ fontSize: 26, color: isActive ? 'primary.contrastText' : 'text.secondary' }} />
                </Box>
                <Typography variant="caption" sx={{ fontSize: 10, color: isActive ? 'primary.main' : 'text.secondary', fontWeight: isActive ? 700 : 500, lineHeight: 1 }}>
                  {label}
                </Typography>
              </Box>
            </Link>
          );
        }

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
