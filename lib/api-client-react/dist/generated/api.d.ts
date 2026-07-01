import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { ApiError, GetAvailabilityParams, HealthStatus, MenuResponse, ReservationConfirmation, ReservationInput, TimeSlot } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getReserveTableUrl: () => string;
/**
 * Checks availability, appends to Google Sheet, updates availability, sends confirmation email to customer, and notification to manager.
 * @summary Create a table reservation
 */
export declare const reserveTable: (reservationInput: ReservationInput, options?: RequestInit) => Promise<ReservationConfirmation>;
export declare const getReserveTableMutationOptions: <TError = ErrorType<ApiError>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof reserveTable>>, TError, {
        data: BodyType<ReservationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof reserveTable>>, TError, {
    data: BodyType<ReservationInput>;
}, TContext>;
export type ReserveTableMutationResult = NonNullable<Awaited<ReturnType<typeof reserveTable>>>;
export type ReserveTableMutationBody = BodyType<ReservationInput>;
export type ReserveTableMutationError = ErrorType<ApiError>;
/**
* @summary Create a table reservation
*/
export declare const useReserveTable: <TError = ErrorType<ApiError>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof reserveTable>>, TError, {
        data: BodyType<ReservationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof reserveTable>>, TError, {
    data: BodyType<ReservationInput>;
}, TContext>;
export declare const getGetAvailabilityUrl: (params: GetAvailabilityParams) => string;
/**
 * @summary Get available time slots for a date
 */
export declare const getAvailability: (params: GetAvailabilityParams, options?: RequestInit) => Promise<TimeSlot[]>;
export declare const getGetAvailabilityQueryKey: (params?: GetAvailabilityParams) => readonly ["/api/availability", ...GetAvailabilityParams[]];
export declare const getGetAvailabilityQueryOptions: <TData = Awaited<ReturnType<typeof getAvailability>>, TError = ErrorType<ApiError>>(params: GetAvailabilityParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAvailability>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAvailability>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAvailabilityQueryResult = NonNullable<Awaited<ReturnType<typeof getAvailability>>>;
export type GetAvailabilityQueryError = ErrorType<ApiError>;
/**
 * @summary Get available time slots for a date
 */
export declare function useGetAvailability<TData = Awaited<ReturnType<typeof getAvailability>>, TError = ErrorType<ApiError>>(params: GetAvailabilityParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAvailability>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetMenuUrl: () => string;
/**
 * @summary Get full menu
 */
export declare const getMenu: (options?: RequestInit) => Promise<MenuResponse>;
export declare const getGetMenuQueryKey: () => readonly ["/api/menu"];
export declare const getGetMenuQueryOptions: <TData = Awaited<ReturnType<typeof getMenu>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMenu>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMenu>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMenuQueryResult = NonNullable<Awaited<ReturnType<typeof getMenu>>>;
export type GetMenuQueryError = ErrorType<unknown>;
/**
 * @summary Get full menu
 */
export declare function useGetMenu<TData = Awaited<ReturnType<typeof getMenu>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMenu>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map