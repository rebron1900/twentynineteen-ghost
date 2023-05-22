import '../../sass/style.scss';
import initClickHandler from './clickHandler';
import { determineColorModeSupport } from './colorModeToggle';
import responsiveTableInit from './responsiveTables';
import generatePagination from './pagination';
import generateColorPaletee from './generateColorPalette';
import initMediumZoom from './medium_zoom';

initClickHandler();
determineColorModeSupport();
responsiveTableInit();
generateColorPaletee();
initMediumZoom();
generatePagination();