//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

abstract contract Context {

    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _msgValue() internal view virtual returns (uint256 value) {
        return msg.value;
    }    


}

abstract contract Owner is Context {
    address public owner;

    constructor () {
        owner = _msgSender();
    }


    /**
    * Throws if called by any account other than the owner.
     */

    modifier onlyOwner() {
        require(_msgSender() == owner,"Only accessible to the owner");
        _;
    }

    /**
    * check if the current caller is the contract owner.
     */

    function isOwner() internal view returns(bool) {
        return owner == _msgSender();
    }
    
}



contract Voyte is Owner{
    
    address public myOwner;

    mapping(address => bool) admin;
    event Admin(address indexed user, bool status);

    constructor() {
        admin[_msgSender()] = true;
        emit Admin(_msgSender(),true);
    }

    modifier onlyAdmin(){
        require(admin[_msgSender()],"Only accessible to an Admin");
        _;
    }

    function addAdmin(address user,bool status) onlyOwner external {
        admin[user] = status;
        emit Admin(user,status);
    }
    


///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Users Users Users ////////////////////////////////////////////////////

    modifier hasNoAccount(address user){
        require(!users[user].exist,"This address already has an account");
        _;
    }
    
    modifier accessGranted(address _user, string memory password){
        string memory savedPass = users[_user].password;
      
        require(keccak256(abi.encodePacked(savedPass)) == keccak256(abi.encodePacked(password)), "Access not granted, wrong password");
        _;
    }

    struct User {
        bool exist;
        address user;
        string password;
        bytes32 resetCode;
    }
    
    uint256 userCounter = 0;
    mapping(address => User ) users;
    mapping(uint256 => address ) addressIndex;
    
    
    //TODO create modifier if address exist
    // creats a user 
    event CreateUser (address user, uint time); 
    function creatUser(address userm, string memory passwordm,bytes32 passkey) public returns (bool success ){
        User memory user = User(true,userm,passwordm,passkey);
        users[userm] = user;
        userCounter++;
        
        addressIndex[userCounter] =userm;
        
        emit CreateUser(users[userm].user,block.timestamp);
        
        return true;
    }
    
    function login(address mUser, string memory passwordm ) public view returns (bool success) {
        
        string memory savedPass = users[mUser].password;
        
        if (bytes(savedPass).length != bytes(passwordm).length) {
            return false;
        }
        
        return keccak256(abi.encodePacked(savedPass)) == keccak256(abi.encodePacked(passwordm));
    }
    
    function getPassword(bytes32 passkey,address _user) public view returns (string memory password){
        if(users[_user].resetCode == passkey){
            return users[_user].password;
        }
        return "none";
    }
    
    function getUserCounter() public view returns (uint256 totalUsers) {
        return userCounter;
    }

    

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// ADDRESS STATUS ADDRESS STATUS  ADDRESS STATUS/////////////////////////

    struct AddressStatus{
        bool isBanned;
        bool isRectricated;
        string reason;
    }

    mapping(address => AddressStatus) addressStatus;

    /**
    *   Adds an address to the list of blocked or restricted user depending on the violation
    *
     */
    event UpdateAddressStatus(address user, uint256 timestamp);

    function updateAddressStatus(address user, bool isBanned, bool isRectricated,string memory reason) onlyAdmin public {
        AddressStatus memory addStatus = AddressStatus(isBanned,isRectricated,reason);
        addressStatus[user] = addStatus;
        emit UpdateAddressStatus(user,block.timestamp);
    }

    /**
    *   Removes an address from the list of blocked or restricted user 
    *
     */

     event DeleteFromUpdateAddressStatus(address user, uint256 timestamp);

    function deleteFromUpdateAddressStatus (address user) onlyAdmin public{
        delete addressStatus[user];
        emit DeleteFromUpdateAddressStatus(user, block.timestamp);
    }
    
    

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////PROFILE PROFILE PROFILE//////////////////////////////////////////////

//Profile Voyte

    modifier hasNoProfile(address user){
        require(!profiles[user].exists,"This address already has profile");
        _;
    }
    
    modifier accountCreated(address user){
        require(users[user].exist,"Please create a user account; createUser()");
        _;
    }
    
    

    struct UserName {
        string firstName;
        string lastName;
    }
    
    struct Contact {
        bytes32 email;
        bytes32 website;
        uint40 phone;
        bytes32 physicalAddress;
        bytes32 country;
        
    }

    struct Profile {
        bool exists;
        address mAddress;
        UserName userName;
        Contact Contact;
        string bio;
        bytes32 ProfileType;
        bool isVerified;

    }

    uint256 profileCounter = 0;
    mapping (address => Profile ) profiles;
    mapping (uint256 => address) profileAddress;

    /**
    *   Add a new profile
    *
     */
    event CreateProfile( uint256 timestamp);

    function createProfile(address _user,string memory _password, UserName memory _username, Contact memory _contact,string memory _bio, 
                              bytes32  _profileType) hasNoProfile(_user) accountCreated(_user) accessGranted(_user,_password)  public returns (bool success){

        
        profileCounter ++;
        
        Profile memory profile = Profile(true,_user,_username,_contact,_bio,_profileType,false);
        profiles[_user] = profile;
        profileAddress[profileCounter] = _user;

        emit CreateProfile(block.timestamp);

        return true;

    }
    
    
    //edit profile
    
     function editProfile(address _user,string memory _password, UserName memory _username, Contact memory _contact,string memory _bio, 
                              bytes32  _profileType) accountCreated(_user) accessGranted(_user,_password)  public returns (bool success){

        
        profileCounter ++;
        
        Profile memory profile = Profile(true,_user,_username,_contact,_bio,_profileType,false);
        profiles[_user] = profile;
        profileAddress[profileCounter] = _user;

        return true;

    }

    function getProfile(address _user)  public view returns (Profile memory userAddress) {
        return profiles[_user];
    }

    function getProfileAddress(uint256 _index) public view returns (address userAddress) {
        return profileAddress[_index];
    }
    
    function getProfileCounter() public view returns (uint256 totalProfiles){
        return profileCounter;
    }

    /**
    *   deletes profile
    */

    event DeleteProfile(address user, uint256 timestamp);

    function deleteProfile(address user) public onlyAdmin (){
        delete profiles[user];

        emit DeleteProfile(user,block.timestamp);
    }
    
    

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////POST POST POST POST//////////////////////////////////////////////////

    modifier hasProfile(address user){
        require(profiles[user].exists,"You must create a profile to make a post");
        _;
    }

    struct Post {
        
        uint80 postId;
        address mAddress;
        address affliation;
        uint256 minAmounts;
        string caption;
        string message;
        string mediaUrls;
        uint256 dateCreated;
        
        
    }

    uint256 postId = 0;

    mapping (address => uint256 [] ) postAddressIndex;
    mapping (uint256 => Post ) posts;

    

    /**
    * Creates a post with affilliation
    */

    event NewPost(uint256 postId);

    function addPost(uint80 _postId, address _user,string memory _password, address _affiliation, uint256 _minAmount,
    string memory _caption, string memory _message, string memory _mediaUrl) accessGranted(_user, _password) hasProfile(_user) public returns (bool success){
        Post memory post = Post(_postId,_user,_affiliation,_minAmount,_caption,_message,_mediaUrl,block.timestamp);

        posts[postId] = post;
        postAddressIndex[_user].push(postId);
        postId++;
        emit NewPost(postId);

        return true;
    }
    
    /**
     * 
     * */

    
    function editPost(uint80 _postId, address _user,string memory _password, address _affiliation, uint256 _minAmount,
    string memory _caption, string memory _message, string memory _mediaUrl) accessGranted(_user, _password) hasProfile(_user) public returns (bool success){
        Post memory post = Post(_postId,_user,_affiliation,_minAmount,_caption,_message,_mediaUrl,block.timestamp);

        posts[postId] = post;

        return true;
    }


    function getUserPost(uint256 _index) public view returns (Post memory) {
        return posts[_index];
    }

    function getPostAddressSize(address _user) public view returns (uint256 arraySize) {
        return postAddressIndex[_user].length ;
    }
    
    function getPostAddressData(address _user) public view returns (uint256[] memory data) {
        return postAddressIndex[_user];
    }
    
    function getPostCounter() public view returns (uint256 postCounter ){
        return postId;
    }

    /**
    *   Deletes a posts, only onwer 
    */
    event DeletePost(uint256 postId);

     function deletePost( address _user, string memory _password ,uint256 _postIndex,uint80 _postId) hasProfile(_user) accessGranted(_user,_password) public returns (bool success) {
         
        if(posts[_postIndex].postId == _postId){
            delete posts[_postIndex];
            emit DeletePost(_postId);
            return true;
        }

        return false;
     }



}


