import '../../sass/style.scss';
import { determineColorModeSupport } from './colorModeToggle';
import responsiveTableInit from './responsiveTables';
import generateColorPaletee from './generateColorPalette';
import initMediumZoom from './medium_zoom';

determineColorModeSupport();
responsiveTableInit();
generateColorPaletee();
initMediumZoom();