'use client';

import { useState, useEffect } from 'react';

export function useExtendedTelemetry() {
  const [gpu, setGpu] = useState<string>('Loading...');
  const [storage, setStorage] = useState<{ usage: string; quota: string }>({
    usage: 'Loading...',
    quota: 'Loading...',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          queueMicrotask(() => setGpu(renderer || 'Unknown GPU'));
        } else {
          queueMicrotask(() => setGpu('WebGL Supported (Masked)'));
        }
      } else {
        queueMicrotask(() => setGpu('WebGL Unsupported'));
      }
    } catch {
      queueMicrotask(() => setGpu('N/A'));
    }
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(({ usage, quota }) => {
        const formatMB = (bytes?: number) =>
          bytes ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : 'N/A';
        const formatGB = (bytes?: number) =>
          bytes ? `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB` : 'N/A';

        setStorage({
          usage: formatMB(usage),
          quota: formatGB(quota),
        });
      }).catch(() => {
        setStorage({ usage: 'N/A', quota: 'N/A' });
      });
    } else {
      queueMicrotask(() => setStorage({ usage: 'Unsupported', quota: 'Unsupported' }));
    }
  }, []);

  return { gpu, storage };
}