import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width:120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top:10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #696969;
        color: #fff;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  button {
    background: #7159c1;
    border-radius: 5%;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    padding: 12px;
    border: none;
    font-weight: bold;

    &[disabled]{
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

export const IssueFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 20px;

  span {
    font-weight: bold;
    font-size: 18px;
  }

  button {
    margin-left: 10px;
    font-weight: bold;
    padding: 10px;
    border-radius: 10%;
    border: none;

    &:nth-child(${props => props.active + 1}) {
      background: #7159c1;
      color: #fff;
    }
  }
`;
