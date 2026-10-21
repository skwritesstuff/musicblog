/* Same-tab GitHub login, using Decap's backend and normal credential handling. */
(() => {
  const {CMS, h, createClass} = window;
  const GitHubBackend = CMS.getBackend('github').BackendClass;
  const loginResult = new URL(window.location.href).searchParams.get('login');
  let pendingHandoff = loginResult === 'complete';
  const Login = createClass({
    getInitialState() {
      return {error:loginResult === 'failed' ? 'GitHub sign-in could not be completed. Please try again.' : '', loading:pendingHandoff};
    },
    componentDidMount() {
      if (loginResult) window.history.replaceState(null, '', '/admin/' + window.location.hash);
      if (!pendingHandoff) return;
      // A later logout must show the login link, not replay this handoff.
      pendingHandoff = false;
      fetch('/cms/session', {method:'POST',credentials:'same-origin',cache:'no-store'})
        .then(async response => {
          if (!response.ok) throw Error('Sign-in expired. Please sign in again.');
          return response.json();
        }).then(data => this.props.onLogin(data)).catch(() => {
        this.setState({loading:false,error:'Sign-in could not be completed. Please sign in again.'});
      });
    },
    render() {
      const loading = !this.props.error && (this.state.loading || this.props.inProgress);
      return h('main', {className:'cms-sign-in'},
        h('img', {src:'/images/in-audio-we-trust-emblem.webp',alt:'In Audio We Trust',width:144,height:144}),
        h('h1', {}, 'Copy editor'),
        h('p', {}, 'Sign in with the GitHub account that manages this archive.'),
        this.state.error || this.props.error ? h('p', {role:'alert'}, this.state.error || 'Sign-in could not be completed. Please try again.') : null,
        loading ? h('p', {role:'status'}, 'Opening the editor…') : h('a', {className:'cms-sign-in-button',href:'/cms/auth?provider=github&site_id=shameis.com'}, 'Login with GitHub'),
        h('a', {href:'/'}, 'Go back to site'));
    }
  });
  class RedirectGitHubBackend extends GitHubBackend {
    authComponent() { return Login; }
  }
  CMS.registerBackend('github-redirect', RedirectGitHubBackend);
  CMS.init();
})();
