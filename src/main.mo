import L "mo:devefi-icrc-ledger";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import I "mo:itertools/Iter";
import Nat8 "mo:base/Nat8";
import Nat64 "mo:base/Nat64";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor class() = this {
    let v = 3;
    type AirdropTarget = (Nat, Blob);

    var airdrop_total : Nat = 0;
    var airdrop_accounts : [AirdropTarget] = [];
    var blacklisted_amount : Nat = 0;


    stable let lmem = L.LMem(); 
    let ledger = L.Ledger(lmem, "f54if-eqaaa-aaaaq-aacea-cai", #last);
    
    ledger.start();

    public shared({caller}) func drop(b: ?Blob, to:{owner:Principal; subaccount:?Blob}) : async Float {
        let acc = Principal.toLedgerAccount(caller, b);

        let my_target = Array.find<AirdropTarget>(airdrop_accounts,  func((share, ac)) = ac == acc);
        let ?target = my_target else return 0;
        
        Float.fromInt(target.0) / Float.fromInt(airdrop_total) * 17000;
    };

    public shared({caller}) func start() : async () {
        assert(Principal.isController(caller));
        ledger.setOwner(this);
    };

    public shared({caller}) func giveback() : async () { // Used during testing
        assert(Principal.isController(caller));
        let balance = ledger.balance(null);
        ignore ledger.send({ to = {owner = Principal.fromText("rmkjr-pkara-z3nvk-suc64-4l77p-5iuzh-uqeyi-dcof2-fony2-yzlu2-qqe"); subaccount=null}; from_subaccount=null; amount = balance; });
    };


    public shared({caller}) func import_drop_targets(targets : [AirdropTarget]) : async () {
        assert(Principal.isController(caller));
        assert(Array.size(airdrop_accounts) == 0); // can't be set again

        airdrop_accounts := targets;
        airdrop_total := Array.foldRight<AirdropTarget, Nat>(airdrop_accounts, 0, func((share, _), acc) = share + acc);
    };

    public query func get_amounts() : async {airdrop:Nat;  total_accounts:Nat} {
        {airdrop = airdrop_total;  total_accounts = Array.size(airdrop_accounts)};
    };

    public func export_drop_targets() : async [AirdropTarget] {
        airdrop_accounts;
    };

    public query func getInfo() : async L.Info { 
        ledger.getInfo();
    };

    public query func getErrors() : async [Text] {
        ledger.getErrors();
    };


}