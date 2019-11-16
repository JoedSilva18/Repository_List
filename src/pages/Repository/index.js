import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import PropTypes from 'prop-types';
import { Loading, Owner, IssueList, PageActions, IssueFilter } from './styles';
import Container from '../../components/Container';

class Repository extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string
      }),
    }).isRequired
  }

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Aberta', active: false },
      { state: 'closed', label: 'Fechada', active: false },
    ],
    filterIndex: 0,
    page: 1
  }

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { page, filters } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          page,
          per_page: 5,
          state: filters.find(f => f.active).state,
        }
      })
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    });
  }

  loadIssues = async action => {

    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { page, filters, filterIndex } = this.state;
    console.log(filters[filterIndex].state);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        page,
        per_page: 5,
        state: filters[filterIndex].state,
      }
    });

    this.setState({
      issues: issues.data
    });

  }

  handlePage = async action => {

    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1
    })

    this.loadIssues();
  }

  handleFilterClick = async index => {
    await this.setState({ filterIndex: index });
    this.loadIssues();
  }

  render() {

    const {
      repository,
      issues,
      loading,
      page,
      filters,
      filterIndex
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositorios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <IssueFilter active={filterIndex}>
            <span>Filtros: </span>
            <div>
              {filters.map((filter, index) => (
                <button
                  type='button'
                  key={filter.label}
                  onClick={() => this.handleFilterClick(index)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </IssueFilter>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PageActions>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}>
            Voltar
          </button>
          <button
            type="button"
            onClick={() => this.handlePage('next')}>
            Avançar
          </button>
        </PageActions>
      </Container >
    )
  }

}

export default Repository;
