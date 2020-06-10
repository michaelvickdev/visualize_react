/* eslint-disable no-use-before-define */
/* eslint-env jest */
/* eslint-env browser */
const ComponentDisplay = require('../extension/devtools/panel/componentDisplay');
const searchData = require('../temp/search-example');
const search = require('../temp/search');

describe('ComponentDisplay class testing', () => {
  let CD;
  const testName = 'test';

  beforeEach(() => {
    const parent = document.createElement('div');
    CD = new ComponentDisplay({ name: testName }, parent);
  });

  it('class instantiates', () => {
    expect(!!CD).toBe(true);
  });

  it('displays children', () => {
    const testArr = [1, 2, 3];

    const result = CD.displayChildren(testArr);

    const target = document.createElement('details');
    target.innerHTML = formatHTML`<summary>Children</summary>
                                  <ul>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                  </ul>`;

    expect(result.isEqualNode(target)).toBe(true);
  });

  it('displays arrays', () => {
    // set up environment
    const testArr = [
      [1, 2],
      [3, 4],
    ];

    // receive result from targetted function
    const result = CD.displayData(testArr);

    // create target node
    const target = document.createElement('details');
    target.innerHTML = formatHTML`<summary>Array</summary>
                                  <ol start="0">
                                    <li>
                                      <details>
                                        <summary>Array</summary>
                                        <ol start="0">
                                          <li>1</li>
                                          <li>2</li>
                                        </ol>
                                      </details>
                                    </li>
                                    <li>
                                      <details>
                                      <summary>Array</summary>
                                        <ol start="0">
                                          <li>3</li>
                                          <li>4</li>
                                        </ol>
                                      </details>
                                    </li>
                                  </ol>`;

    // compare nodes
    expect(result.innerHTML === target.innerHTML).toBe(true);
    // dom elements being tested against each other
    expect(result.isEqualNode(target)).toBe(true);
  });

  xit('displays objects', () => {
    // set up input
    const testObj = {
      a: 1,
      b: 2,
    };

    // execute function
    const result = CD.displayData(testObj);

    // create target node
    const target = document.createElement('details');
    target.innerHTML = formatHTML`<summary>Object</summary>
                                  <ul>
                                    <li>a1</li>
                                    <li>b2</li>
                                  </ul>`;

    console.log('target: ', target.innerHTML);
    console.log('result: ', result.innerHTML);
    console.log(typeof result.children[1].children[0].innerHTML);
    expect(result.isEqualNode(target)).toBe(true);
  });

  xit('displays nested objects', () => {
    // set up input
    const testObj = {
      a: 1,
      b: {
        c: 3,
      },
    };

    // execute function
    const result = CD.displayData(testObj);

    const target = document.createElement('details');
    target.innerHTML = formatHTML`<summary>Object</summary>
                                  <ul>
                                    <li>a: 1</li>
                                    <li>b: 
                                      <details>
                                        <summary>Object</summary>
                                        <ul>
                                          <li>c: 3</li>
                                        </ul>
                                      </details>
                                    </li>
                                  </ul>`;

    console.log('result: ', result.innerHTML);
    console.log('target', target.innerHTML);
    expect(1).toBe(1);
  });

  it('displays state', () => {
    const state = [1, 2, 3];

    const result = CD.displayState(state);

    const target = document.createElement('details');
    target.innerHTML = formatHTML`<summary>State</summary>
                                  <span>
                                    <details>
                                      <summary>Array</summary>
                                      <ol start="0">
                                        <li>1</li>
                                        <li>2</li>
                                        <li>3</li>
                                      </ol>
                                    </details>
                                  </span>`;

    expect(target.isEqualNode(result)).toBe(true);
  });

  xit('displays props', () => {
    const props = { a: 1, b: 2 };

    const result = CD.displayProps(props);

    const target = document.createElement('details');
    target.innerHTML = formatHTML`<summary>Props</summary>
                                  <ul>
                                    <li>a: 1</li>
                                    <li>b: 2</li>
                                  </ul>`;

    console.log('target: ', target.innerHTML);
    console.log('result: ', result.innerHTML);
    expect(target.isEqualNode(result)).toBe(true);
  });
});

xdescribe('Search functionality', () => {
  it('finds App', () => {
    const result = search(searchData, 'App');

    expect(result.length).toBe(1);
  });

  it('returns -1 when none found', () => {
    const result = search(searchData, 'afjasdnflnaslfmsad');

    expect(result).toBe(-1);
  });
});

xit('panel display', () => {
  // create environment
  const infoPanel = document.createElement('div');
  infoPanel.id = 'info-panel';
});

xit('isEqualNode test', () => {
  const test1 = document.createElement('ul');
  test1.innerHTML = formatHTML`<li>a: 1</li>`;
  const li = document.createElement('li');
  li.append(`a: `, '1');
  test1.append(li);

  const test2 = document.createElement('ul');
  test2.innerHTML = formatHTML`<li>a: 1</li>`;

  console.log(test1.innerHTML);
  console.log(test2.innerHTML);
  expect(test1.isEqualNode(test2)).toBe(true);
});

function formatHTML(strings) {
  return strings[0]
    .split('\n')
    .map((s) => s.trim())
    .join('');
}
