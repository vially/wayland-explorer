import { GitServiceProvider } from '../model/wayland-protocol-metadata'
import { ExecutionEnvironment } from './execution-environment'

export const appConfig = {
    domain: 'wayland.app',
    analyticsDomain: 'analytics.wayland.app',
}

export const userConfig = {
    gitServiceProvider: getPreferredGitService(),
}

function getPreferredGitService(): GitServiceProvider {
    const useGitLab =
        ExecutionEnvironment.canUseDOM &&
        window.localStorage.getItem('gitServiceProvider')?.toLowerCase() ===
            'gitlab'

    return useGitLab ? GitServiceProvider.GitLab : GitServiceProvider.GitHub
}
