// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TennisMatches {
    struct Match {
        uint256 id;
        string tournament;
        string category;
        string homePlayer;
        string awayPlayer;
        string homeCountry;
        string awayCountry;
        string homeScore;
        string awayScore;
        string status;
        bool isLive;
        bool hasBritish;
        uint256 startTimestamp;
        uint256 lastUpdated;
    }

    address public admin;
    mapping(uint256 => Match) public matches;
    uint256[] public matchIds;
    mapping(uint256 => bool) public matchExists;

    event MatchAdded(uint256 indexed matchId, string homePlayer, string awayPlayer);
    event MatchUpdated(uint256 indexed matchId, string status, string homeScore, string awayScore);
    event AdminChanged(address indexed newAdmin);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addMatch(
        uint256 _id,
        string memory _tournament,
        string memory _category,
        string memory _homePlayer,
        string memory _awayPlayer,
        string memory _homeCountry,
        string memory _awayCountry,
        bool _hasBritish,
        uint256 _startTimestamp
    ) external onlyAdmin {
        require(!matchExists[_id], "Match already exists");

        Match memory newMatch = Match({
            id: _id,
            tournament: _tournament,
            category: _category,
            homePlayer: _homePlayer,
            awayPlayer: _awayPlayer,
            homeCountry: _homeCountry,
            awayCountry: _awayCountry,
            homeScore: "0",
            awayScore: "0",
            status: "Scheduled",
            isLive: false,
            hasBritish: _hasBritish,
            startTimestamp: _startTimestamp,
            lastUpdated: block.timestamp
        });

        matches[_id] = newMatch;
        matchExists[_id] = true;
        matchIds.push(_id);

        emit MatchAdded(_id, _homePlayer, _awayPlayer);
    }

    function updateMatch(
        uint256 _id,
        string memory _homeScore,
        string memory _awayScore,
        string memory _status,
        bool _isLive
    ) external onlyAdmin {
        require(matchExists[_id], "Match does not exist");

        matches[_id].homeScore = _homeScore;
        matches[_id].awayScore = _awayScore;
        matches[_id].status = _status;
        matches[_id].isLive = _isLive;
        matches[_id].lastUpdated = block.timestamp;

        emit MatchUpdated(_id, _status, _homeScore, _awayScore);
    }

    function getMatch(uint256 _id) external view returns (Match memory) {
        require(matchExists[_id], "Match does not exist");
        return matches[_id];
    }

    function getAllMatches() external view returns (Match[] memory) {
        Match[] memory result = new Match[](matchIds.length);
        for (uint256 i = 0; i < matchIds.length; i++) {
            result[i] = matches[matchIds[i]];
        }
        return result;
    }

    function getMatchCount() external view returns (uint256) {
        return matchIds.length;
    }

    function changeAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0), "Invalid address");
        admin = _newAdmin;
        emit AdminChanged(_newAdmin);
    }
}
