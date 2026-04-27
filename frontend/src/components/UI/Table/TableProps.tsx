import { Box, Button, Tooltip, useTheme, alpha, IconButton, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  type MRT_RowData,
  type MRT_TableInstance,
  MRT_GlobalFilterTextField
} from 'material-react-table';
import CustomPagination from './CustomPagination';
import { handleDownloadExcel } from '@/utils/ExcelUploads';
import ExcelImage from '@/assets/icons/excel.svg';
import { useAppSelector } from '@/store';

interface props {
  HeaderText?: string
  table: MRT_TableInstance<MRT_RowData> | any;
  ExcelData?: {
    data: any;
    fileName: any;
    ignoreValues?: string[];
    keepTheSameNamingCase?: string[];
    replaceNaming?: any;
  };
  isSmall?: boolean;
  hideFullScreen?: boolean;
  actionButton?: React.ReactNode;
}

export const TableBottomToolbar = ({ table }: props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        // Set a fixed height for the container to make it compact
        height: '36px',
        // Ensure content is vertically centered
        alignItems: 'center',
        // Remove any default padding
        padding: '0 !important'
      }}
    >
      <Box
        className="pagination-container"
        sx={{
          // Remove padding from all child Box components
          '& .MuiBox-root': { padding: '0px !important' },
          // Consistent font size for all text elements in the footer
          '& .MuiTypography-root': { fontSize: '10px !important' },
          '& .MuiTablePagination-select': { fontSize: '10px !important' },
          '& .MuiTablePagination-selectLabel': { fontSize: '10px !important', fontWeight: 600 },
          '& .MuiTablePagination-displayedRows': { fontSize: '10px !important', fontWeight: 400 },
          // Ensure the pagination toolbar is compact
          '& .MuiToolbar-root': {
            minHeight: '36px !important',
            height: '36px !important',
            padding: '0 8px !important'
          },
          // Increase button size for better clickability
          '& .MuiTablePagination-actions .MuiButtonBase-root': {
            width: '28px !important',
            height: '28px !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important'
          },
          // Increase icon size using width and height
          '& .MuiTablePagination-actions .MuiButtonBase-root .MuiSvgIcon-root': {
            width: '22px !important',
            height: '22px !important',
            fontSize: 'unset !important' // Use width/height instead of font-size
          }
        }}
      >
        <CustomPagination table={table} />
      </Box>
    </Box>
  );
};


export const TableHeaderToolbar = ({ HeaderText, table, ExcelData, actionButton }: props) => {
  const userDateFormat = useAppSelector((state: any) => state.auth.user?.dateFormat);
  const theme = useTheme();
  const isSearchActive = !!table.getState().showGlobalFilter;

  return (
    <Box
      sx={{
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {
        HeaderText && (

          <Typography
            variant="h5"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              marginLeft: 1
            }}
          >
            {HeaderText}
          </Typography>
        )
      }
      <Box
        component={motion.div}
        layout
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          ml: 'auto'
        }}
      >

        {/* Search Search/Group */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <motion.div
            initial={false}
            animate={{
              width: isSearchActive ? 'auto' : 0,
              opacity: isSearchActive ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}
          >
            <Box sx={{ width: { xs: '160px', sm: '260px' }, mr: 0.5 }}>
              <MRT_GlobalFilterTextField
                table={table}
                placeholder="Search items..."
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    height: '30px',
                    fontSize: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '6px',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: 'border-color 0.2s ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.5)
                    },
                    '&.Mui-focused': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
                    }
                  },
                  '& .MuiInputBase-input': {
                    padding: '4px 8px'
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '18px',
                    color: theme.palette.text.secondary
                  },
                  '& .MuiInputAdornment-root': {
                    marginRight: '4px'
                  }
                }}
              />
            </Box>
          </motion.div>

          <IconButton
            onClick={() => {
              const isShowing = !!table.getState().showGlobalFilter;
              table.setShowGlobalFilter(!isShowing);
              if (isShowing) {
                table.setGlobalFilter('');
              }
            }}
            sx={{
              p: 0.5,
              width: '32px',
              height: '32px',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
              },
              '& .MuiSvgIcon-root': {
                fontSize: '20px'
              }
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Excel Button */}
        {ExcelData && (
          <Tooltip title="Excel Download">
            <Button
              onClick={() =>
                handleDownloadExcel(
                  ExcelData?.data,
                  ExcelData?.fileName,
                  userDateFormat || 'DD-MM-YYYY',
                  ExcelData?.ignoreValues,
                  ExcelData?.keepTheSameNamingCase,
                  ExcelData?.replaceNaming
                )
              }
              sx={{
                p: 0,
                minWidth: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  background: alpha(theme.palette.success.main, 0.05),
                }
              }}
            >
              <Box component={'img'} src={ExcelImage} alt="excel" sx={{ width: 18, height: 18 }} />
            </Button>
          </Tooltip>
        )}

        <AnimatePresence initial={false}>
          {!isSearchActive && actionButton && (
            <motion.div
              key="action-button"
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}
            >
              {actionButton}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};
