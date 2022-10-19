import WorkspaceRepository from "../src/data/repositories/Workspace.repository.js";
// import Workspace from "../src/domain/Workspace.model.js";
const mockFecthOne = jest.fn();

const workspaceRepository = new WorkspaceRepository()

jest.mock('../src/data/repositories/Workspace.repository.js', () => 
    jest.fn().mockImplementation(() => ({
        fetchOne: mockFetchOne,
    }),
));



await test('Find all workspace', async ()=>{
    // Mexican test
    const result = await workspaceRepository.fetchOne.mockResolvedOnce(() => Promise.resolve(true))
    console.log(result)
    expect(result).toBe(1)
});