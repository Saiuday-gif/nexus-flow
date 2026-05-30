import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

type AnyEventMap = Record<string, any>

export default function useSocket<T extends AnyEventMap = AnyEventMap>(
  url: string | null,
  options?: Parameters<typeof io>[1]
) {
  const socketRef = useRef<Socket | null>(null)
  const [connected, setConnected] = useState(false)

  const connect = useCallback(() => {
    if (!url) return
    if (socketRef.current) return
    const socket = io(url, options)
    socketRef.current = socket
    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
  }, [url, options])

  const disconnect = useCallback(() => {
    const s = socketRef.current
    if (!s) return
    s.disconnect()
    socketRef.current = null
    setConnected(false)
  }, [])

  useEffect(() => {
    // auto-connect when url is provided
    if (url) connect()
    return () => {
      disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const emit = useCallback((event: keyof T | string, ...args: any[]) => {
    const s = socketRef.current
    if (!s) return
    s.emit(event as string, ...args)
  }, [])

  const on = useCallback(<K extends keyof T = keyof T>(event: K | string, cb: (...args: any[]) => void) => {
    const s = socketRef.current
    if (!s) return () => {}
    s.on(event as string, cb)
    return () => s.off(event as string, cb)
  }, [])

  const off = useCallback((event: keyof T | string, cb?: (...args: any[]) => void) => {
    const s = socketRef.current
    if (!s) return
    if (cb) s.off(event as string, cb)
    else s.off(event as string)
  }, [])

  return {
    socket: socketRef.current,
    connected,
    connect,
    disconnect,
    emit,
    on,
    off,
  }
}
