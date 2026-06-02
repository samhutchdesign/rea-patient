'use client';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { mockNotifications } from '@/lib/mock-data';

const typeIcon = {
  program_update: FitnessCenterRoundedIcon,
  reminder: NotificationsOutlinedIcon,
  message: ChatBubbleOutlineRoundedIcon,
};

function formatRelative(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function NotificationsPage() {
  const router = useRouter();
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <Box sx={{ px: 2.5, pt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Notifications</Typography>
        {unread > 0 && <Chip label={`${unread} new`} size="small" sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 600 }} />}
      </Box>

      <Card>
        {mockNotifications.map((notif, i) => {
          const Icon = typeIcon[notif.type];
          return (
            <Box key={notif.id}>
              <Box
                onClick={() => notif.link && router.push(notif.link)}
                sx={{
                  px: 2, py: 1.75, display: 'flex', gap: 1.5, alignItems: 'flex-start',
                  bgcolor: !notif.read ? 'action.hover' : 'transparent',
                  cursor: notif.link ? 'pointer' : 'default',
                  '&:hover': notif.link ? { bgcolor: 'action.selected' } : {},
                  transition: 'background-color 0.15s',
                }}
              >
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.25 }}>
                  <Icon sx={{ fontSize: 16, color: 'primary.main' }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.4 }}>{notif.message}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                    {formatRelative(notif.timestamp)}
                  </Typography>
                </Box>
                {!notif.read && <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: 0.75 }} />}
              </Box>
              {i < mockNotifications.length - 1 && <Divider />}
            </Box>
          );
        })}
      </Card>
    </Box>
  );
}
