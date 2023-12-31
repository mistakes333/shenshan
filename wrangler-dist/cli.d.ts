/// <reference types="node" />

import { Blob as Blob_2 } from 'buffer';
import Dispatcher = require('./dispatcher');
import { ReadableStream } from 'stream/web';
import { URL as URL_2 } from 'url';
import { URLSearchParams as URLSearchParams_2 } from 'url';

declare interface BlobPropertyBag {
    type?: string
    endings?: 'native' | 'transparent'
}

declare type BodyInit =
| ArrayBuffer
| AsyncIterable<Uint8Array>
| Blob_2
| FormData
| Iterable<Uint8Array>
| NodeJS.ArrayBufferView
| URLSearchParams_2
| null
| string

declare interface BodyMixin {
    readonly body: ReadableStream | null
    readonly bodyUsed: boolean

    readonly arrayBuffer: () => Promise<ArrayBuffer>
    readonly blob: () => Promise<Blob_2>
    readonly formData: () => Promise<FormData>
    readonly json: () => Promise<unknown>
    readonly text: () => Promise<string>
}

/**
 * The possible types for a `Rule`.
 */
declare type ConfigModuleRuleType = "ESModule" | "CommonJS" | "CompiledWasm" | "Text" | "Data";

declare type CustomDomainRoute = {
    pattern: string;
    custom_domain: boolean;
};

/**
 * Deprecated upload configuration.
 */
declare interface DeprecatedUpload {
    /**
     * The format of the Worker script.
     *
     * @deprecated We infer the format automatically now.
     */
    format?: "modules" | "service-worker";
    /**
     * The directory you wish to upload your worker from,
     * relative to the wrangler.toml file.
     *
     * Defaults to the directory containing the wrangler.toml file.
     *
     * @deprecated
     */
    dir?: string;
    /**
     * The path to the Worker script, relative to `upload.dir`.
     *
     * @deprecated This will be replaced by a command line argument.
     */
    main?: string;
    /**
     * @deprecated This is now defined at the top level `rules` field.
     */
    rules?: Environment["rules"];
}

declare type DurableObjectBindings = {
    /** The name of the binding used to refer to the Durable Object */
    name: string;
    /** The exported class name of the Durable Object */
    class_name: string;
    /** The script where the Durable Object is defined (if it's external to this worker) */
    script_name?: string;
    /** The service environment of the script_name to bind to */
    environment?: string;
}[];

declare interface EnablePagesAssetsServiceBindingOptions {
    proxyPort?: number;
    directory?: string;
}

/**
 * The `Environment` interface declares all the configuration fields that
 * can be specified for an environment.
 *
 * This could be the top-level default environment, or a specific named environment.
 */
declare interface Environment extends EnvironmentInheritable, EnvironmentNonInheritable {
}

/**
 * The `EnvironmentInheritable` interface declares all the configuration fields for an environment
 * that can be inherited (and overridden) from the top-level environment.
 */
declare interface EnvironmentInheritable {
    /**
     * The name of your worker. Alphanumeric + dashes only.
     *
     * @inheritable
     */
    name: string | undefined;
    /**
     * This is the ID of the account associated with your zone.
     * You might have more than one account, so make sure to use
     * the ID of the account associated with the zone/route you
     * provide, if you provide one. It can also be specified through
     * the CLOUDFLARE_ACCOUNT_ID environment variable.
     *
     * @inheritable
     */
    account_id: string | undefined;
    /**
     * A date in the form yyyy-mm-dd, which will be used to determine
     * which version of the Workers runtime is used.
     *
     * More details at https://developers.cloudflare.com/workers/platform/compatibility-dates
     *
     * @inheritable
     */
    compatibility_date: string | undefined;
    /**
     * A list of flags that enable features from upcoming features of
     * the Workers runtime, usually used together with compatibility_flags.
     *
     * More details at https://developers.cloudflare.com/workers/platform/compatibility-dates
     *
     * @inheritable
     */
    compatibility_flags: string[];
    /**
     * The entrypoint/path to the JavaScript file that will be executed.
     */
    main: string | undefined;
    /**
     * Whether we use <name>.<subdomain>.workers.dev to
     * test and deploy your worker.
     *
     * @default `true` (This is a breaking change from wrangler 1)
     * @breaking
     * @inheritable
     */
    workers_dev: boolean | undefined;
    /**
     * A list of routes that your worker should be published to.
     * Only one of `routes` or `route` is required.
     *
     * Only required when workers_dev is false, and there's no scheduled worker (see `triggers`)
     *
     * @inheritable
     */
    routes: Route[] | undefined;
    /**
     * A route that your worker should be published to. Literally
     * the same as routes, but only one.
     * Only one of `routes` or `route` is required.
     *
     * Only required when workers_dev is false, and there's no scheduled worker
     *
     * @inheritable
     */
    route: Route | undefined;
    /**
     * Path to a custom tsconfig
     */
    tsconfig: string | undefined;
    /**
     * The function to use to replace jsx syntax.
     *
     * @default `"React.createElement"`
     * @inheritable
     */
    jsx_factory: string;
    /**
     * The function to use to replace jsx fragment syntax.
     *
     * @default `"React.Fragment"`
     * @inheritable
     */
    jsx_fragment: string;
    /**
     * "Cron" definitions to trigger a worker's "scheduled" function.
     *
     * Lets you call workers periodically, much like a cron job.
     *
     * More details here https://developers.cloudflare.com/workers/platform/cron-triggers
     *
     * @default `{crons:[]}`
     * @inheritable
     */
    triggers: {
        crons: string[];
    };
    /**
     * Specifies the Usage Model for your Worker. There are two options -
     * [bundled](https://developers.cloudflare.com/workers/platform/limits#bundled-usage-model) and
     * [unbound](https://developers.cloudflare.com/workers/platform/limits#unbound-usage-model).
     * For newly created Workers, if the Usage Model is omitted
     * it will be set to the [default Usage Model set on the account](https://dash.cloudflare.com/?account=workers/default-usage-model).
     * For existing Workers, if the Usage Model is omitted, it will be
     * set to the Usage Model configured in the dashboard for that Worker.
     *
     * @inheritable
     */
    usage_model: "bundled" | "unbound" | undefined;
    /**
     * An ordered list of rules that define which modules to import,
     * and what type to import them as. You will need to specify rules
     * to use Text, Data, and CompiledWasm modules, or when you wish to
     * have a .js file be treated as an ESModule instead of CommonJS.
     *
     * @inheritable
     */
    rules: Rule[];
    /**
     * Configures a custom build step to be run by Wrangler when building your Worker.
     *
     * Refer to the [custom builds documentation](https://developers.cloudflare.com/workers/cli-wrangler/configuration#build)
     * for more details.
     *
     * @default {}
     */
    build: {
        /** The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used. */
        command?: string;
        /** The directory in which the command is executed. */
        cwd?: string;
        /** The directory to watch for changes while using wrangler dev, defaults to the current working directory */
        watch_dir?: string | string[];
        /**
         * Deprecated field previously used to configure the build and upload of the script.
         * @deprecated
         */
        upload?: DeprecatedUpload;
    };
    /**
     * Skip internal build steps and directly publish script
     * @inheritable
     */
    no_bundle: boolean | undefined;
    /**
     * Minify the script before uploading.
     * @inheritable
     */
    minify: boolean | undefined;
    /**
     * Add polyfills for node builtin modules and globals
     * @inheritable
     */
    node_compat: boolean | undefined;
    /**
     * Specifies namespace bindings that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    dispatch_namespaces: {
        /** The binding name used to refer to the bound service. */
        binding: string;
        /** The namespace to bind to. */
        namespace: string;
    }[];
    /**
     *	Designates this worker as an internal-only "first-party" worker.
     */
    first_party_worker: boolean | undefined;
    /**
     * TODO: remove this as it has been deprecated.
     *
     * This is just here for now because the `route` commands use it.
     * So we need to include it in this type so it is available.
     */
    zone_id?: string;
    /**
     * Specify a compiled capnp schema to use
     * Then add a binding per field in the top level message that you will send to logfwdr
     *
     * @default `{schema:undefined,bindings:[]}`
     * @inheritable
     */
    logfwdr: {
        /** capnp schema filename */
        schema: string | undefined;
        bindings: {
            /** The binding name used to refer to logfwdr */
            name: string;
            /** The destination for this logged message */
            destination: string;
        }[];
    };
    /**
     * Send Trace Events from this worker to Workers Logpush.
     *
     * This will not configure a corresponding Logpush job automatically.
     *
     * For more information about Workers Logpush, see:
     * https://blog.cloudflare.com/logpush-for-workers/
     *
     * @inheritable
     */
    logpush: boolean | undefined;
}

/**
 * The `EnvironmentNonInheritable` interface declares all the configuration fields for an environment
 * that cannot be inherited from the top-level environment, and must be defined specifically.
 *
 * If any of these fields are defined at the top-level then they should also be specifically defined
 * for each named environment.
 */
declare interface EnvironmentNonInheritable {
    /**
     * A map of values to substitute when deploying your worker.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{}`
     * @nonInheritable
     */
    define: Record<string, string>;
    /**
     * A map of environment variables to set when deploying your worker.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{}`
     * @nonInheritable
     */
    vars: {
        [key: string]: unknown;
    };
    /**
     * A list of durable objects that your worker should be bound to.
     *
     * For more information about Durable Objects, see the documentation at
     * https://developers.cloudflare.com/workers/learning/using-durable-objects
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{bindings:[]}`
     * @nonInheritable
     */
    durable_objects: {
        bindings: DurableObjectBindings;
    };
    /**
     * These specify any Workers KV Namespaces you want to
     * access from inside your Worker.
     *
     * To learn more about KV Namespaces,
     * see the documentation at https://developers.cloudflare.com/workers/learning/how-kv-works
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    kv_namespaces: {
        /** The binding name used to refer to the KV Namespace */
        binding: string;
        /** The ID of the KV namespace */
        id: string;
        /** The ID of the KV namespace used during `wrangler dev` */
        preview_id?: string;
    }[];
    /**
     * Specifies Queues that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{}`
     * @nonInheritable
     */
    queues: {
        /** Producer bindings */
        producers?: {
            /** The binding name used to refer to the Queue in the worker. */
            binding: string;
            /** The name of this Queue. */
            queue: string;
        }[];
        /** Consumer configuration */
        consumers?: {
            /** The name of the queue from which this script should consume. */
            queue: string;
            /** The maximum number of messages per batch */
            max_batch_size?: number;
            /** The maximum number of seconds to wait to fill a batch with messages. */
            max_batch_timeout?: number;
            /** The maximum number of retries for each message. */
            max_retries?: number;
            /** The queue to send messages that failed to be consumed. */
            dead_letter_queue?: string;
        }[];
    };
    /**
     * Specifies R2 buckets that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    r2_buckets: {
        /** The binding name used to refer to the R2 bucket in the worker. */
        binding: string;
        /** The name of this R2 bucket at the edge. */
        bucket_name: string;
        /** The preview name of this R2 bucket at the edge. */
        preview_bucket_name?: string;
    }[];
    /**
     * Specifies D1 databases that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    d1_databases: {
        /** The binding name used to refer to the D1 database in the worker. */
        binding: string;
        /** The name of this D1 database. */
        database_name: string;
        /** The UUID of this D1 database (not required). */
        database_id: string;
        /** The UUID of this D1 database for Wrangler Dev (if specified). */
        preview_database_id?: string;
        /** The name of the migrations table for this D1 database (defaults to 'd1_migrations'). */
        migrations_table?: string;
        /** The path to the directory of migrations for this D1 database (defaults to './migrations'). */
        migrations_dir?: string;
        /** Internal use only. */
        database_internal_env?: string;
    }[];
    /**
     * Specifies service bindings (worker-to-worker) that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    services: {
        /** The binding name used to refer to the bound service. */
        binding: string;
        /** The name of the service. */
        service: string;
        /** The environment of the service (e.g. production, staging, etc). */
        environment?: string;
    }[] | undefined;
    /**
     * Specifies analytics engine datasets that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    analytics_engine_datasets: {
        /** The binding name used to refer to the dataset in the worker. */
        binding: string;
        /** The name of this dataset to write to. */
        dataset?: string;
    }[];
    /**
     * "Unsafe" tables for features that aren't directly supported by wrangler.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{ bindings: [] }`
     * @nonInheritable
     */
    unsafe: {
        /**
         * A set of bindings that should be put into a Worker's upload metadata without changes. These
         * can be used to implement bindings for features that haven't released and aren't supported
         * directly by wrangler or miniflare.
         *
         * @default []
         */
        bindings: {
            name: string;
            type: string;
            [key: string]: unknown;
        }[];
    };
}

declare class File extends Blob_2 {
    /**
     * Creates a new File instance.
     *
     * @param fileBits An `Array` strings, or [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [`ArrayBufferView`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView), [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) objects, or a mix of any of such objects, that will be put inside the [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File).
     * @param fileName The name of the file.
     * @param options An options object containing optional attributes for the file.
     */
    constructor(fileBits: ReadonlyArray<string | NodeJS.ArrayBufferView | Blob_2>, fileName: string, options?: FilePropertyBag)

    /**
     * Name of the file referenced by the File object.
     */
    readonly name: string

    /**
     * The last modified date of the file as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight). Files without a known last modified date return the current date.
     */
    readonly lastModified: number

    readonly [Symbol.toStringTag]: string
}

declare interface FilePropertyBag extends BlobPropertyBag {
    /**
     * The last modified date of the file as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight). Files without a known last modified date return the current date.
     */
    lastModified?: number
}

/**
 * Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using fetch().
 */
declare class FormData {
    /**
     * Appends a new value onto an existing key inside a FormData object,
     * or adds the key if it does not already exist.
     *
     * The difference between `set()` and `append()` is that if the specified key already exists, `set()` will overwrite all existing values with the new one, whereas `append()` will append the new value onto the end of the existing set of values.
     *
     * @param name The name of the field whose data is contained in `value`.
     * @param value The field's value. This can be [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
     or [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File). If none of these are specified the value is converted to a string.
     * @param fileName The filename reported to the server, when a Blob or File is passed as the second parameter. The default filename for Blob objects is "blob". The default filename for File objects is the file's filename.
     */
    append(name: string, value: unknown, fileName?: string): void

    /**
     * Set a new value for an existing key inside FormData,
     * or add the new field if it does not already exist.
     *
     * @param name The name of the field whose data is contained in `value`.
     * @param value The field's value. This can be [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
     or [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File). If none of these are specified the value is converted to a string.
     * @param fileName The filename reported to the server, when a Blob or File is passed as the second parameter. The default filename for Blob objects is "blob". The default filename for File objects is the file's filename.
     *
     */
    set(name: string, value: unknown, fileName?: string): void

    /**
     * Returns the first value associated with a given key from within a `FormData` object.
     * If you expect multiple values and want all of them, use the `getAll()` method instead.
     *
     * @param {string} name A name of the value you want to retrieve.
     *
     * @returns A `FormDataEntryValue` containing the value. If the key doesn't exist, the method returns null.
     */
    get(name: string): FormDataEntryValue | null

    /**
     * Returns all the values associated with a given key from within a `FormData` object.
     *
     * @param {string} name A name of the value you want to retrieve.
     *
     * @returns An array of `FormDataEntryValue` whose key matches the value passed in the `name` parameter. If the key doesn't exist, the method returns an empty list.
     */
    getAll(name: string): FormDataEntryValue[]

    /**
     * Returns a boolean stating whether a `FormData` object contains a certain key.
     *
     * @param name A string representing the name of the key you want to test for.
     *
     * @return A boolean value.
     */
    has(name: string): boolean

    /**
     * Deletes a key and its value(s) from a `FormData` object.
     *
     * @param name The name of the key you want to delete.
     */
    delete(name: string): void

    /**
     * Executes given callback function for each field of the FormData instance
     */
    forEach: (
    callbackfn: (value: FormDataEntryValue, key: string, iterable: FormData) => void,
    thisArg?: unknown
    ) => void

    /**
     * Returns an [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) allowing to go through all keys contained in this `FormData` object.
     * Each key is a `string`.
     */
    keys: () => SpecIterableIterator<string>

    /**
     * Returns an [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) allowing to go through all values contained in this object `FormData` object.
     * Each value is a [`FormDataValue`](https://developer.mozilla.org/en-US/docs/Web/API/FormDataEntryValue).
     */
    values: () => SpecIterableIterator<FormDataEntryValue>

    /**
     * Returns an [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) allowing to go through the `FormData` key/value pairs.
     * The key of each pair is a string; the value is a [`FormDataValue`](https://developer.mozilla.org/en-US/docs/Web/API/FormDataEntryValue).
     */
    entries: () => SpecIterableIterator<[string, FormDataEntryValue]>

    /**
     * An alias for FormData#entries()
     */
    [Symbol.iterator]: () => SpecIterableIterator<[string, FormDataEntryValue]>

    readonly [Symbol.toStringTag]: string
}

/**
 * A `string` or `File` that represents a single value from a set of `FormData` key-value pairs.
 */
declare type FormDataEntryValue = string | File

declare class Headers implements SpecIterable<[string, string]> {
    constructor (init?: HeadersInit)
    readonly append: (name: string, value: string) => void
    readonly delete: (name: string) => void
    readonly get: (name: string) => string | null
    readonly has: (name: string) => boolean
    readonly set: (name: string, value: string) => void
    readonly forEach: (
    callbackfn: (value: string, key: string, iterable: Headers) => void,
    thisArg?: unknown
    ) => void

    readonly keys: () => SpecIterableIterator<string>
    readonly values: () => SpecIterableIterator<string>
    readonly entries: () => SpecIterableIterator<[string, string]>
    readonly [Symbol.iterator]: () => SpecIterator<[string, string]>
}

declare type HeadersInit = string[][] | Record<string, string | ReadonlyArray<string>> | Headers

declare interface PagesPublishOptions {
    /**
     * Path to static assets to publish to Pages
     */
    directory: string;
    /**
     * The Cloudflare Account ID that owns the project that's
     * being published
     */
    accountId: string;
    /**
     * The name of the project to be published
     */
    projectName: string;
    /**
     * Branch name to use. Defaults to production branch
     */
    branch?: string;
    /**
     * Whether or not to skip local file upload result caching
     */
    skipCaching?: boolean;
    /**
     * Commit message associated to deployment
     */
    commitMessage?: string;
    /**
     * Commit hash associated to deployment
     */
    commitHash?: string;
    /**
     * Whether or not the deployment should be considered to be
     * in a dirty commit state
     */
    commitDirty?: boolean;
    /**
     * Path to the project's functions directory. Default uses
     * the current working directory + /functions since this is
     * typically called in a CLI
     */
    functionsDirectory?: string;
    /**
     * Whether to run bundling on `_worker.js` before deploying.
     * Default: false
     */
    bundle?: boolean;
}

/**
 * Publish a directory to an account/project.
 * NOTE: You will need the `CLOUDFLARE_API_KEY` environment
 * variable set
 */
declare function publish({ directory, accountId, projectName, branch, skipCaching, commitMessage, commitHash, commitDirty, functionsDirectory: customFunctionsDirectory, bundle, }: PagesPublishOptions): Promise<{
    environment: "production" | "preview";
    id: string;
    url: string;
    project_name: string;
    build_config: {
        build_command: string;
        destination_dir: string;
        root_dir: string;
        web_analytics_tag?: string | undefined;
        web_analytics_token?: string | undefined;
        fast_builds?: boolean | undefined;
    };
    created_on: string;
    production_branch: string;
    project_id: string;
    deployment_trigger: {
        type: string;
        metadata: {
            branch: string;
            commit_hash: string;
            commit_message: string;
        };
    };
    latest_stage: {
        name: "build" | "queued" | "initialize" | "clone_repo" | "deploy";
        status: "active" | "canceled" | "success" | "idle" | "failure" | "skipped";
        started_on: string | null;
        ended_on: string | null;
    };
    stages: {
        name: "build" | "queued" | "initialize" | "clone_repo" | "deploy";
        status: "active" | "canceled" | "success" | "idle" | "failure" | "skipped";
        started_on: string | null;
        ended_on: string | null;
    }[];
    aliases: string[];
    modified_on: string;
    short_id: string;
    build_image_major_version: number;
    kv_namespaces?: any;
    source?: {
        type: "github" | "gitlab";
        config: {
            owner: string;
            repo_name: string;
            production_branch?: string | undefined;
            pr_comments_enabled?: boolean | undefined;
            deployments_enabled?: boolean | undefined;
            production_deployments_enabled?: boolean | undefined;
            preview_deployment_setting?: "none" | "all" | "custom" | undefined;
            preview_branch_includes?: string[] | undefined;
            preview_branch_excludes?: string[] | undefined;
        };
    } | undefined;
    env_vars?: any;
    durable_object_namespaces?: any;
    is_skipped?: boolean | undefined;
    files?: {
        [x: string]: string | undefined;
    } | undefined;
}>;

declare type ReferrerPolicy =
| ''
| 'no-referrer'
| 'no-referrer-when-downgrade'
| 'origin'
| 'origin-when-cross-origin'
| 'same-origin'
| 'strict-origin'
| 'strict-origin-when-cross-origin'
| 'unsafe-url';

declare class Request implements BodyMixin {
    constructor (input: RequestInfo, init?: RequestInit)

    readonly cache: RequestCache
    readonly credentials: RequestCredentials
    readonly destination: RequestDestination
    readonly headers: Headers
    readonly integrity: string
    readonly method: string
    readonly mode: RequestMode
    readonly redirect: RequestRedirect
    readonly referrerPolicy: string
    readonly url: string

    readonly keepalive: boolean
    readonly signal: AbortSignal

    readonly body: ReadableStream | null
    readonly bodyUsed: boolean

    readonly arrayBuffer: () => Promise<ArrayBuffer>
    readonly blob: () => Promise<Blob_2>
    readonly formData: () => Promise<FormData>
    readonly json: () => Promise<unknown>
    readonly text: () => Promise<string>

    readonly clone: () => Request
}

declare type RequestCache =
| 'default'
| 'force-cache'
| 'no-cache'
| 'no-store'
| 'only-if-cached'
| 'reload'

declare type RequestCredentials = 'omit' | 'include' | 'same-origin'

declare type RequestDestination =
| ''
| 'audio'
| 'audioworklet'
| 'document'
| 'embed'
| 'font'
| 'image'
| 'manifest'
| 'object'
| 'paintworklet'
| 'report'
| 'script'
| 'sharedworker'
| 'style'
| 'track'
| 'video'
| 'worker'
| 'xslt'

declare type RequestInfo = string | URL_2 | Request

declare interface RequestInit {
    method?: string
    keepalive?: boolean
    headers?: HeadersInit
    body?: BodyInit
    redirect?: RequestRedirect
    integrity?: string
    signal?: AbortSignal
    credentials?: RequestCredentials
    mode?: RequestMode
    referrer?: string
    referrerPolicy?: ReferrerPolicy
    window?: null
    dispatcher?: Dispatcher
}

declare type RequestMode = 'cors' | 'navigate' | 'no-cors' | 'same-origin'

declare type RequestRedirect = 'error' | 'follow' | 'manual'

declare class Response implements BodyMixin {
    constructor (body?: BodyInit, init?: ResponseInit)

    readonly headers: Headers
    readonly ok: boolean
    readonly status: number
    readonly statusText: string
    readonly type: ResponseType
    readonly url: string
    readonly redirected: boolean

    readonly body: ReadableStream | null
    readonly bodyUsed: boolean

    readonly arrayBuffer: () => Promise<ArrayBuffer>
    readonly blob: () => Promise<Blob_2>
    readonly formData: () => Promise<FormData>
    readonly json: () => Promise<unknown>
    readonly text: () => Promise<string>

    readonly clone: () => Response

    static error (): Response
    static json(data: any, init?: ResponseInit): Response
    static redirect (url: string | URL_2, status: ResponseRedirectStatus): Response
}

declare interface ResponseInit {
    readonly status?: number
    readonly statusText?: string
    readonly headers?: HeadersInit
}

declare type ResponseRedirectStatus = 301 | 302 | 303 | 307 | 308

declare type ResponseType =
| 'basic'
| 'cors'
| 'default'
| 'error'
| 'opaque'
| 'opaqueredirect'

declare type Route = SimpleRoute | ZoneIdRoute | ZoneNameRoute | CustomDomainRoute;

/**
 * A bundling resolver rule, defining the modules type for paths that match the specified globs.
 */
declare type Rule = {
    type: ConfigModuleRuleType;
    globs: string[];
    fallthrough?: boolean;
};

declare type SimpleRoute = string;

declare interface SpecIterable<T> {
    [Symbol.iterator](): SpecIterator<T>;
}

declare interface SpecIterableIterator<T> extends SpecIterator<T> {
    [Symbol.iterator](): SpecIterableIterator<T>;
}

declare interface SpecIterator<T, TReturn = any, TNext = undefined> {
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
}

/**
 *  unstable_dev starts a wrangler dev server, and returns a promise that resolves with utility functions to interact with it.
 */
export declare function unstable_dev(script: string, options?: UnstableDevOptions, apiOptions?: unknown): Promise<UnstableDevWorker>;

export declare const unstable_pages: {
    publish: typeof publish;
};

export declare interface UnstableDevOptions {
    config?: string;
    env?: string;
    ip?: string;
    port?: number;
    bundle?: boolean;
    inspectorPort?: number;
    localProtocol?: "http" | "https";
    assets?: string;
    site?: string;
    siteInclude?: string[];
    siteExclude?: string[];
    nodeCompat?: boolean;
    compatibilityDate?: string;
    compatibilityFlags?: string[];
    persist?: boolean;
    persistTo?: string;
    vars?: {
        [key: string]: unknown;
    };
    kv?: {
        binding: string;
        id: string;
        preview_id?: string;
    }[];
    durableObjects?: {
        name: string;
        class_name: string;
        script_name?: string | undefined;
        environment?: string | undefined;
    }[];
    r2?: {
        binding: string;
        bucket_name: string;
        preview_bucket_name?: string;
    }[];
    logLevel?: "none" | "info" | "error" | "log" | "warn" | "debug";
    logPrefix?: string;
    inspect?: boolean;
    local?: boolean;
    accountId?: string;
    experimental?: {
        d1Databases?: Environment["d1_databases"];
        disableExperimentalWarning?: boolean;
        disableDevRegistry?: boolean;
        enablePagesAssetsServiceBinding?: EnablePagesAssetsServiceBindingOptions;
        experimentalLocal?: boolean;
        experimentalLocalRemoteKv?: boolean;
        forceLocal?: boolean;
        liveReload?: boolean;
        showInteractiveDevSession?: boolean;
        testMode?: boolean;
        testScheduled?: boolean;
        watch?: boolean;
    };
}

export declare interface UnstableDevWorker {
    port: number;
    address: string;
    stop: () => Promise<void>;
    fetch: (input?: RequestInfo, init?: RequestInit) => Promise<Response>;
    waitUntilExit: () => Promise<void>;
}

declare type ZoneIdRoute = {
    pattern: string;
    zone_id: string;
    custom_domain?: boolean;
};

declare type ZoneNameRoute = {
    pattern: string;
    zone_name: string;
    custom_domain?: boolean;
};

export { }
