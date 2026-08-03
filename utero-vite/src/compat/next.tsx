import { Link as RouterLink } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import type { ReactNode } from 'react';

// Next.js Link wrapper
interface NextLinkProps extends Omit<LinkProps, 'to'> {
  href: string;
  children: ReactNode;
}

export function Link({ href, children, ...props }: NextLinkProps) {
  return <RouterLink to={href} {...props}>{children}</RouterLink>;
}

// Next.js Image wrapper - rename to avoid conflict with DOM Image
interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
}

export function NextImage({ 
  width, 
  height, 
  priority, 
  quality, 
  placeholder, 
  blurDataURL, 
  ...props 
}: NextImageProps) {
  return <img {...props} />;
}

// Export as Image for compatibility
export { NextImage as Image };

// Google Analytics stub
export function sendGAEvent(_params: Record<string, any>) {
  // console.log('GA Event:', params);
}
