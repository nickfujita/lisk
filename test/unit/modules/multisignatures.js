'use strict';

describe('multisignatures', function () {

	describe('constructor', function () {

		describe('library', function () {

			it('should assign logger');

			it('should assign db');

			it('should assign network');

			it('should assign schema');

			it('should assign ed');

			it('should assign bus');

			it('should assign balancesSequence');

			it('should assign logic.transaction');
		});

		describe('__private', function () {

			it('should call library.logic.transaction.attachAssetType');

			it('assign __private.assetTypes[transactionTypes.MULTI]');
		});

		it('should return error = null');

		it('should return Multisignature instance');
	});

	describe('processSignature', function () {

		function continueSignatureProcessing () {

			it('should call library.balancesSequence.add');

			it('should call modules.transactions.getMultisignatureTransaction');

			it('should call modules.transactions.getMultisignatureTransaction with transaction.transaction');

			describe('when multisignature transaction.transaction does not exist', function () {

				it('should call callback with error = "Transaction not found"');
			});

			describe('when multisignature transaction.transaction exists', function () {

				it('should call modules.accounts.getAccount');

				it('should call modules.accounts.getAccount with {address: transaction.senderId}');

				describe('when modules.accounts.getAccount fails', function () {

					it('should call callback with error');
				});

				describe('when modules.accounts.getAccount succeeds', function () {

					describe('when sender does not exist', function () {

						it('should call callback with error = "Sender not found"');
					});

					describe('when sender exists', function () {

						it('should call Multisignature.prototype.ready');

						it('should call Multisignature.prototype.ready with multisignature with signatures containing transaction.signature');

						it('should call Multisignature.prototype.ready with sender');

						it('should call library.bus.message');

						it('should call library.bus.message with "signature"');

						it('should call library.bus.message with {transaction: transaction.transaction, signature: transaction.signature}');

						it('should call library.bus.message with true');

						it('should call callback with error = undefined');

						it('should call callback with result = undefined');
					});
				});
			});
		}

		describe('when no transaction passed', function () {

			it('should call callback with error = "Unable to process signature. Signature is undefined."');
		});

		describe('when transaction passed', function () {

			it('should call modules.transactions.getMultisignatureTransaction');

			it('should call modules.transactions.getMultisignatureTransaction with transaction.transaction');

			describe('when multisignature transaction.transaction does not exist', function () {

				it('should call callback with error = "Transaction not found"');
			});

			describe('when multisignature transaction.transaction exists', function () {

				describe('when transaction type != transactionTypes.MULTI', function () {

					it('should call modules.accounts.getAccount');

					it('should call modules.accounts.getAccount with {address: transaction.senderId}');

					describe('when modules.accounts.getAccount fails', function () {

						it('should call callback with error = "Multisignature account not found"');
					});

					describe('when modules.accounts.getAccount succeeds', function () {

						describe('when account does not exist', function () {

							it('should call callback with error = "Account account not found"');
						});

						describe('when account exists', function () {

							describe('when multisignature already contains transaction.signature', function () {

								it('should call callback with error = "Signature already exists"');
							});

							describe('for every account.multisignatures', function () {

								it('should call library.logic.transaction.verifySignature');

								it('should call library.logic.transaction.verifySignature with multisignature');

								it('should call library.logic.transaction.verifySignature with account.multisignatures');

								it('should call library.logic.transaction.verifySignature with transaction.signature');

								describe('when library.logic.transaction.verifySignature throws', function () {

									it('should call library.logger.error');

									it('should call library.logger.error with error stack');

									it('should call callback with error = "Failed to verify signature"');
								});

								describe('when library.logic.transaction.verifySignature returns false', function () {

									it('should call callback with error = "Failed to verify signature"');
								});

								describe('when library.logic.transaction.verifySignature returns true', function () {

									continueSignatureProcessing();
								});
							});
						});
					});
				});

				describe('when multisignature transaction type = transactionTypes.MULTI', function () {

					describe('when multisignature is already signed', function () {

						it('should call callback with error = "Permission to sign transaction denied"');
					});

					describe('when multisignature already contains transaction.signature', function () {

						it('should call callback with error = "Permission to sign transaction denied"');
					});

					describe('for every multisignature keysgroup member', function () {

						it('should call library.logic.transaction.verifySignature');

						it('should call library.logic.transaction.verifySignature with multisignature');

						it('should call library.logic.transaction.verifySignature with keysgroup member');

						it('should call library.logic.transaction.verifySignature with transaction.signature');

						describe('when library.logic.transaction.verifySignature throws', function () {

							it('should call library.logger.error');

							it('should call library.logger.error with error stack');

							it('should call callback with error = "Failed to verify signature"');
						});

						describe('when library.logic.transaction.verifySignature returns false', function () {

							it('should call callback with error = "Failed to verify signature"');
						});

						describe('when library.logic.transaction.verifySignature returns true', function () {

							continueSignatureProcessing();
						});
					});
				});
			});
		});
	});

	describe('isLoaded', function () {

		it('should return true if modules exists');

		it('should return true if modules does not exist');
	});

	describe('onBind', function () {

		describe('modules', function () {

			it('should assign accounts');

			it('should assign transactions');
		});

		describe('assetTypes', function () {

			it('should call bind on multisignature logic with scope.accounts');
		});
	});

	describe('shared', function () {

		describe('getAccounts', function () {

			it('should call library.schema.validate');

			it('should call library.schema.validate with req.body');

			it('should call library.schema.validate with schema.getAccounts');

			describe('when schema validation fails', function () {

				it('should call a callback with schema error');
			});

			describe('when schema validation succeeds', function () {

				it('should call library.db.one');

				it('should call library.db.one with sql.getAccountIds');

				it('should call library.db.one with { publicKey: req.body.publicKey }');

				describe('when library.db.one fails', function () {

					it('should call the logger.error with error stack');

					it('should call a callback with "Multisignature#getAccountIds error"');
				});

				describe('when library.db.one succeeds', function () {

					it('should call modules.accounts.getAccounts');

					it('should call modules.accounts.getAccounts with {address: {$in: scope.accountIds}, sort: "balance"}');

					it('should call modules.accounts.getAccounts with ["address", "balance", "multisignatures", "multilifetime", "multimin"]');

					describe('when modules.accounts.getAccounts fails', function () {

						it('should call a callback with error');
					});

					describe('when modules.accounts.getAccounts succeeds', function () {

						describe('for every account', function () {

							describe('for every account.multisignature', function () {

								it('should call modules.accounts.generateAddressByPublicKey');

								it('should call modules.accounts.generateAddressByPublicKey with multisignature');
							});

							it('should call modules.accounts.getAccounts');

							it('should call modules.accounts.getAccounts with {address: { $in: addresses }');

							it('should call modules.accounts.getAccounts with ["address", "publicKey", "balance"]');

							describe('when modules.accounts.getAccounts fails', function () {

								it('should call a callback with error');
							});

							describe('when modules.accounts.getAccounts succeeds', function () {

								it('should call a callback with error = null');

								it('should call a callback with result containing accounts');
							});
						});
					});
				});
			});
		});

		describe('pending', function () {

			it('should call library.schema.validate');

			it('should call library.schema.validate with req.body');

			it('should call library.schema.validate with schema.pending');

			describe('when schema validation fails', function () {

				it('should call a callback with schema error');
			});

			describe('when schema validation succeeds', function () {

				it('should call modules.transactions.getMultisignatureTransactionList');

				it('should call modules.transactions.getMultisignatureTransactionList with false twice');

				describe('when there are no multisig transactions matching passed publicKey', function () {

					it('should call a callback with error = null');

					it('should call a callback with result containing transactions = []');
				});

				describe('when multisig transactions matching passed publicKey exists', function () {

					it('should call library.logic.transaction.verifySignature with every signature');

					describe('when library.logic.transaction.verifySignature throws exception', function () {

						it('should call the logger.error with error stack');

						it('should call a callback with transactions containing "signed" = false');
					});

					describe('when library.logic.transaction.verifySignature does not throw exception', function () {

						it('should call a callback with transactions containing "signed" = true');
					});

					it('should call modules.accounts.getAccount');

					it('should call modules.accounts.getAccounts with {publicKey: transaction.senderPublicKey}');

					describe('when modules.accounts.getAccount fails', function () {

						it('should call callback with error');
					});

					describe('when modules.accounts.getAccount succeeds', function () {

						describe('and finds no account', function () {

							it('should call a callback with error');
						});

						describe('and finds account', function () {

							describe('when u_multimin is defined', function () {

								describe('when multimin is undefined', function () {

									it('should call a callback with transaction containing min = u_multimin');
								});

								describe('when multimin is defined', function () {

									it('should call a callback with transaction containing min = u_multimin');
								});
							});

							describe('when u_multimin is undefined', function () {

								describe('when multimin is undefined', function () {

									it('should call a callback with transaction containing min = undefined');
								});

								describe('when multimin is defined', function () {

									it('should call a callback with transaction containing min = multimin');
								});
							});

							describe('when u_multilifetime is defined', function () {

								describe('when multilifetime is undefined', function () {

									it('should call a callback with transaction containing lifetime = u_multilifetime');
								});

								describe('when multilifetime is defined', function () {

									it('should call a callback with transaction containing lifetime = u_multilifetime');
								});
							});

							describe('when u_multilifetime is undefined', function () {

								describe('when multilifetime is undefined', function () {

									it('should call a callback with transaction containing lifetime = undefined');
								});

								describe('when multilifetime is defined', function () {

									it('should call a callback with transaction containing lifetime = multilifetime');
								});
							});

							describe('when multimin is undefined', function () {

								it('should call a callback with transaction containing max = 0');
							});

							describe('when multimin is defined', function () {

								it('should call a callback with transaction containing max = u_multisignatures.length');
							});
						});
					});
				});
			});
		});
	});
});
