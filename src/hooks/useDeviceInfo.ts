'use client';

import { useState, useEffect, useCallback } from 'react';

// Extended Navigator interface for properties not in standard TypeScript definitions
interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: NetworkConnection;
}

interface NetworkConnection {
  effectiveType?: string;
  type?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
}

interface DeviceInfo {
  // Time and Date
  currentTime: Date | null;
  timezone: string;
  
  // Browser Information
  userAgent: string;
  platform: string;
  language: string;
  languages: readonly string[];
  cookieEnabled: boolean;
  doNotTrack: string | null;
  
  // Device Information
  hardwareConcurrency: number;
  deviceMemory: number | null;
  maxTouchPoints: number;
  touchSupport: boolean;
  
  // Screen Information
  screenWidth: number;
  screenHeight: number;
  availScreenWidth: number;
  availScreenHeight: number;
  colorDepth: number;
  pixelDepth: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  
  // Network Information
  connectionType: string;
  effectiveConnectionType: string;
  downlink: number | null;
  rtt: number | null;
  saveData: boolean | null;
  networkAvailable: boolean;
  
  // Online Status
  isOnline: boolean;
  
  // Location
  locationPermission: string;
  latitude: number | null;
  longitude: number | null;
  locationError: string | null;
  requestLocation: () => void;
  
  // Loading state
  isLoading: boolean;
}

export function useDeviceInfo(): DeviceInfo {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState<string>('');
  const [userAgent, setUserAgent] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [languages, setLanguages] = useState<readonly string[]>([]);
  const [cookieEnabled, setCookieEnabled] = useState<boolean>(false);
  const [doNotTrack, setDoNotTrack] = useState<string | null>(null);
  const [hardwareConcurrency, setHardwareConcurrency] = useState<number>(0);
  const [deviceMemory, setDeviceMemory] = useState<number | null>(null);
  const [maxTouchPoints, setMaxTouchPoints] = useState<number>(0);
  const [touchSupport, setTouchSupport] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [availScreenWidth, setAvailScreenWidth] = useState<number>(0);
  const [availScreenHeight, setAvailScreenHeight] = useState<number>(0);
  const [colorDepth, setColorDepth] = useState<number>(0);
  const [pixelDepth, setPixelDepth] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [devicePixelRatio, setDevicePixelRatio] = useState<number>(1);
  const [connectionType, setConnectionType] = useState<string>('Not available');
  const [effectiveConnectionType, setEffectiveConnectionType] = useState<string>('Not available');
  const [downlink, setDownlink] = useState<number | null>(null);
  const [rtt, setRtt] = useState<number | null>(null);
  const [saveData, setSaveData] = useState<boolean | null>(null);
  const [networkAvailable, setNetworkAvailable] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [locationPermission, setLocationPermission] = useState<string>('unknown');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize browser information
  useEffect(() => {
    const initializeDeviceInfo = () => {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return;
      }

      const nav = navigator as ExtendedNavigator;

      // Time and Date
      setCurrentTime(new Date());
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);

      // Browser Information
      setUserAgent(nav.userAgent || 'Not available');
      setPlatform(nav.platform || 'Not available');
      setLanguage(nav.language || 'Not available');
      setLanguages(nav.languages || []);
      setCookieEnabled(nav.cookieEnabled);
      setDoNotTrack(nav.doNotTrack || null);

      // Device Information
      setHardwareConcurrency(nav.hardwareConcurrency || 0);
      setDeviceMemory(nav.deviceMemory || null);
      setMaxTouchPoints(nav.maxTouchPoints || 0);
      setTouchSupport('ontouchstart' in window || nav.maxTouchPoints > 0);

      // Screen Information
      if (typeof screen !== 'undefined') {
        setScreenWidth(screen.width);
        setScreenHeight(screen.height);
        setAvailScreenWidth(screen.availWidth);
        setAvailScreenHeight(screen.availHeight);
        setColorDepth(screen.colorDepth);
        setPixelDepth(screen.pixelDepth);
      }

      // Viewport Information
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      setDevicePixelRatio(window.devicePixelRatio || 1);

      // Network Information
      if (nav.connection) {
        setNetworkAvailable(true);
        setConnectionType(nav.connection.type || 'Not available');
        setEffectiveConnectionType(nav.connection.effectiveType || 'Not available');
        setDownlink(nav.connection.downlink || null);
        setRtt(nav.connection.rtt || null);
        setSaveData(nav.connection.saveData || null);
      }

      // Online Status
      setIsOnline(nav.onLine);

      // Location Permission
      const checkLocationPermission = async () => {
        if ('permissions' in nav) {
          try {
            const result = await nav.permissions.query({ name: 'geolocation' as any });
            setLocationPermission(result.state);
          } catch (error) {
            setLocationPermission('unknown');
          }
        } else {
          setLocationPermission('unknown');
        }
      };

      checkLocationPermission();
      setIsLoading(false);
    };

    initializeDeviceInfo();
  }, []);

  // Live clock - update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setViewportWidth(window.innerWidth);
        setViewportHeight(window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Online/offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Network connection change listener
  useEffect(() => {
    const nav = navigator as ExtendedNavigator;
    if (!nav.connection || !nav.connection.addEventListener) return;

    const handleConnectionChange = () => {
      if (nav.connection) {
        setConnectionType(nav.connection.type || 'Not available');
        setEffectiveConnectionType(nav.connection.effectiveType || 'Not available');
        setDownlink(nav.connection.downlink || null);
        setRtt(nav.connection.rtt || null);
        setSaveData(nav.connection.saveData || null);
      }
    };

    nav.connection.addEventListener('change', handleConnectionChange);
    return () => {
      if (nav.connection && nav.connection.removeEventListener) {
        nav.connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  // Helper function for location error messages
  const getLocationErrorMessage = (code: number): string => {
    switch (code) {
      case 1:
        return 'Permission denied by user';
      case 2:
        return 'Position unavailable';
      case 3:
        return 'Request timeout';
      default:
        return 'Unknown error occurred';
    }
  };

  // Request location function
  const requestLocation = useCallback(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    const nav = navigator as ExtendedNavigator;

    nav.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationError(null);
        setLocationPermission('granted');
      },
      (error) => {
        setLocationError(getLocationErrorMessage(error.code));
        setLatitude(null);
        setLongitude(null);
        if (error.code === 1) { // Permission denied
          setLocationPermission('denied');
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  return {
    currentTime,
    timezone,
    userAgent,
    platform,
    language,
    languages,
    cookieEnabled,
    doNotTrack,
    hardwareConcurrency,
    deviceMemory,
    maxTouchPoints,
    touchSupport,
    screenWidth,
    screenHeight,
    availScreenWidth,
    availScreenHeight,
    colorDepth,
    pixelDepth,
    viewportWidth,
    viewportHeight,
    devicePixelRatio,
    connectionType,
    effectiveConnectionType,
    downlink,
    rtt,
    saveData,
    networkAvailable,
    isOnline,
    locationPermission,
    latitude,
    longitude,
    locationError,
    isLoading,
    requestLocation,
  };
}