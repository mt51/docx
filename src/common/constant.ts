import { join } from "path";

// Colors
export const GREEN = '#07c160';

export const SCRIPT_EXTS = ['.js', '.jsx', '.ts', '.tsx'];

export const STYLE_EXTS = ['.css', '.less', '.scss'];

export const cwdPath = process.cwd();

export const SITE_MOBILE_SHARED_FILE = join(__dirname, '../../sites/configs/site-mobile-shared.js')
export const SITE_DESKTOP_SHARED_FILE = join(__dirname, '../../sites/configs/site-desktop-shared.js')

export const siteConfigOutPath = join(cwdPath, './dist');
export const DOCS_DIR = join(cwdPath, './docs')
export const SRC_DIR = join(cwdPath, './src/components');

export const docxConfigsPath = join(cwdPath, './docx.config.js');
